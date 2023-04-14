import { User } from 'src/apis/users/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import {
  Injectable,
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly connection: Connection,
  ) {}

  async checkDuplicate({ impUid }) {
    const result = await this.pointTransactionRepository.findOne({ impUid });
    if (result) throw new ConflictException('이미 결제된 거래입니다.');
  }

  async checkAlreadyCanceled({ impUid }) {
    const pointTransaction = await this.pointTransactionRepository.findOne({
      impUid,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
    if (pointTransaction)
      throw new ConflictException('이미 취소된 거래입니다.');
  }

  async checkHasCancelablePoint({ impUid, currentUser }) {
    const pointTransaction = await this.pointTransactionRepository.findOne({
      impUid,
      user: { id: currentUser.id },
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });

    if (!pointTransaction)
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다');

    const user = await this.userRepository.findOne({ id: currentUser.id });
    if (user.point < pointTransaction.amount)
      throw new UnprocessableEntityException('취소할 금액이 부족합니다');
  }

  async cancel({ impUid, amount, currentUser }) {
    const pointTransaction = await this.create({
      impUid,
      amount: -amount,
      currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
    return pointTransaction;
  }
  async create({
    impUid,
    amount,
    currentUser,
    status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
  }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    // -트랜젝션 시작
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      // 1. point transaction 테이블에 거래기록 1줄생성
      const pointTransaction = this.pointTransactionRepository.create({
        impUid,
        amount,
        user: currentUser,
        status,
      });
      await this.pointTransactionRepository.save(pointTransaction); //이거 안하고 위에 바로 save 해도 같음
      await queryRunner.manager.save(pointTransaction);
      // throw new Error('강제로 에러 발생!!!'); // 추가
      // 2. 유저의  찾아오기
      // const user = await this.userRepository.findOne({id: currentUser.id,});
      const user = await queryRunner.manager.findOne(
        User,
        { id: currentUser.id },
        { lock: { mode: 'pessimistic_write' } },
      );

      // 3. 유저의 돈을 업데이트
      // await this.userRepository.update(
      //   { id: user.id },
      //   { point: user.point + amount },
      // );
      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);
      // -성공 -> commit
      await queryRunner.commitTransaction();

      // 4. 최종결과 프론트엔드에 돌려주기
      return pointTransaction;
    } catch (error) {
      // - 실패시 rollback
      await queryRunner.rollbackTransaction();
    } finally {
      // - 연결종료
      await queryRunner.release();
    }
  }
}

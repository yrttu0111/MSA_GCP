import { UseGuards, HttpException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionService } from './pointTransaction.service';
import { IamportService } from '../iamport/iamport.service';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService,
    private readonly iamportservice: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  async createPointTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    //검증 로직
    // 1. 아임포트에 ㅇㅇ결제가 완료되었는지 확인
    console.log(impUid);
    const imp_token = await this.iamportservice.getToken();
    await this.iamportservice.checkPaid({ impUid, amount, imp_token });
    // 2. pointTransaction 테이블에 중복된 impUid가 있는지 확인
    await this.pointTransactionService.checkDuplicate({ impUid });

    return this.pointTransactionService.create({ impUid, amount, currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  async cancelPointTransaction(
    @Args('impUid') impUid: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    //검증 로직
    // 1. 이미취소된 건인지 확인
    await this.pointTransactionService.checkAlreadyCanceled({ impUid });
    // 2. 취소하기에 잔액이 남아있는지 확인
    await this.pointTransactionService.checkHasCancelablePoint({
      impUid,
      currentUser,
    });

    // 3. 아임포트에 취소요청
    const imp_token = await this.iamportservice.getToken();
    const canceledAmount = await this.iamportservice.cancelPayment({
      impUid,
      imp_token,
    });
    // 4. pointTransaction 테이블에 취소상태로 업데이트
    return await this.pointTransactionService.cancel({
      impUid,
      amount: canceledAmount,
      currentUser,
    });
  }
}

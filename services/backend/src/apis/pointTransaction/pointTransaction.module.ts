import { User } from 'src/apis/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PointTransactionResolver } from './pointTransaction.resolver';
import { PointTransactionService } from './pointTransaction.service';
import { PointTransaction } from './entities/pointTransaction.entity';
import { IamportService } from '../iamport/iamport.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointTransaction, //
      User,
    ]),
  ],
  providers: [
    PointTransactionResolver,
    PointTransactionService,
    IamportService,
  ],
})
export class PointTransactionModule {}

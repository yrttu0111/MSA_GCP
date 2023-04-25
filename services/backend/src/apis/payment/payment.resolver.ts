import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';

// 아임포트에서 결제시 log를 남기기 위한 resolver
@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}
  @Mutation(() => Payment)
  async createPayment(
    @Args('amount') amount: number, //
  ) {
    return await this.paymentService.create({ amount });
  }
  @Query(() => [Payment])
  async fetchPayments() {
    return await this.paymentService.findAll();
  }
}
 
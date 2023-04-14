import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';
export declare class PaymentResolver {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(amount: number): Promise<Payment[]>;
    fetchPayments(): Promise<Payment[]>;
}

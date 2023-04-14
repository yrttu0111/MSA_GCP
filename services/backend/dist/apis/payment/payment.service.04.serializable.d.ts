import { Connection, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
export declare class PaymentService {
    private readonly paymentRepository;
    private readonly connection;
    constructor(paymentRepository: Repository<Payment>, connection: Connection);
    findAll(): Promise<Payment[]>;
    create({ amount }: {
        amount: any;
    }): Promise<Payment[]>;
}

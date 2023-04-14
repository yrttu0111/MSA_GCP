import { ICurrentUser } from 'src/commons/auth/gql-user.param';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionService } from './pointTransaction.service';
export declare class PointTransactionResolver {
    private readonly pointTransactionService;
    constructor(pointTransactionService: PointTransactionService);
    createPointTransaction(impUid: string, amount: number, currentUser: ICurrentUser): Promise<PointTransaction>;
}

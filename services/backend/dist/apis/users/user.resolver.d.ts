import { ICurrentUser } from '../../commons/auth/gql-user.param';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    craeteUser(email: string, password: string, name: string, age: number): Promise<{
        email: any;
        password: any;
        name: any;
        age: any;
    } & User>;
    fetchUser(currentUser: ICurrentUser): string;
}

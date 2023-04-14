import { User } from 'src/apis/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findOne({ email }: {
        email: any;
    }): Promise<User>;
    create({ email, hashedPassword: password, name, age }: {
        email: any;
        hashedPassword: any;
        name: any;
        age: any;
    }): Promise<{
        email: any;
        password: any;
        name: any;
        age: any;
    } & User>;
}

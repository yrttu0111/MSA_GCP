import { User } from 'src/apis/users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
interface IOauthUser {
    user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
}
export declare class AuthController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    loginGoogle(req: Request & IOauthUser, res: Response): Promise<void>;
}
export {};

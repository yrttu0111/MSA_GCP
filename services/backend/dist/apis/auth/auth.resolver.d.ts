import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
export declare class AuthResolver {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    login(email: string, password: string, context: any): Promise<string>;
    restoreAccessToken(currentUser: any): string;
}

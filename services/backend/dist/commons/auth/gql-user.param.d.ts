export interface ICurrentUser {
    id: string;
    email: string;
    name?: string;
    password?: string;
    age?: number;
}
export declare const CurrentUser: (...dataOrPipes: any[]) => ParameterDecorator;

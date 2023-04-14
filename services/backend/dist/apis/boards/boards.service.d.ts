export declare class BoardService {
    findAll(): {
        number: number;
        writer: string;
        title: string;
        contents: string;
    }[];
    create(): string;
}

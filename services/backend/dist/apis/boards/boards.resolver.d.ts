import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
export declare class BoardResolver {
    private readonly boardService;
    constructor(boardService: BoardService);
    fetchBoards(): () => {
        number: number;
        writer: string;
        title: string;
        contents: string;
    }[];
    createBoard(writer: string, title: string, contents: string, createBoardInput: CreateBoardInput): () => string;
}

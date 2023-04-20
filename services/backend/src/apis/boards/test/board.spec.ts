import { Test, TestingModule } from "@nestjs/testing";
import { BoardService } from "../boards.service";
import { BoardResolver } from "../boards.resolver";



describe('boardService', () => {
    let boardService: BoardService;
    let boardResolver: BoardResolver; 
  
    beforeEach(async () => {
      const userModule: TestingModule = await Test.createTestingModule({
        providers: [
            BoardService,
            BoardResolver
        ],

      }).compile();

        boardService = userModule.get<BoardService>(BoardService);
        
        describe('findAll', () => {
            it('should return an array of boards', async () => {

                expect(await boardService.findAll()).toBe();
            });
        })


    })
})

  
import { BoardCategoryService } from './boardCategory.service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { BoardCategory } from './entities/boardCategory.entity';

@Resolver()
export class BoardCategoryResolver {
  constructor(
    private readonly boardCategoryService: BoardCategoryService,
  ) {}
  @Mutation(() => BoardCategory)
  async createBoardCategory(
    @Args('name') name: string, //
  ) {
    const result = await this.boardCategoryService.create({ name });
    return result;
    }
}

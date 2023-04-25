import {  UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import { UpdateBoardInput } from './dto/updateBoard.input';
@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,
  ) {}
// 보드 조회 
  @Query(() => [Board])
  async fetchBoards() {
    return await this.boardService.findAll();
    
  }

  @Query(() => Board)
  async fetchBoard(
    @Args('number') number: number,
  ) {
    return await this.boardService.findOne({number});
  }
// 보드 생성 (로그인)
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
    @CurrentUser() currentUser: any,
  ) {
    console.log(createBoardInput)
    const result = this.boardService.create({ createBoardInput, user : currentUser });
    return result;
  }
  // 보드 수정 (로그인) 
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async updateBoard(
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
    @Args('number') number: number,
  ) {
    const result = this.boardService.update({ updateBoardInput, number });
    return result;
  }
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteBoard(
    @Args('number') number: number,
  ) {
    const result = this.boardService.delete({ number});
    return result;
  }

}

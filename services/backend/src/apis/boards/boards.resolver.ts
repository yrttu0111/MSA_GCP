import {  UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,
  ) {}

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
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async updateBoard(
    @Args('updateBoardInput') updateBoardInput: CreateBoardInput,
    @Args('number') number: number,
  ) {
    const result = this.boardService.update({ updateBoardInput, number});
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

import { ICurrentUser } from '../../commons/auth/gql-user.param';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userService.create({ email, hashedPassword, name });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    console.log('유저정보는??!!!', currentUser);
    return currentUser;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  findOneByEmail(
    @Args('email') email: string){
    return this.userService.findOne({email});
  }
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  deleteUser(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    const result = this.userService.delete({user:currentUser});
  }
}

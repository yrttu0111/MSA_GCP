import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ChatGPTService } from "./chat-gpt.service";
import { CreateCompletionDto } from "./dto/create-completion.dto";
import { UseGuards } from "@nestjs/common";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { CurrentUser, ICurrentUser } from "src/commons/auth/gql-user.param";
import { ChatGPT } from "./entities/chat-gpt.entity";

@Resolver()
export class ChatGPTResolver {
  constructor(private readonly chatGPTService: ChatGPTService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ChatGPT)
  async DiaryChatBot(
    @Args('createCompletionDto') createCompletionDto: CreateCompletionDto,
    @CurrentUser() currentUser: ICurrentUser,
    
  ) {
    return this.chatGPTService.chatgptAxios({createCompletionDto, user : currentUser});
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [ChatGPT])
  async fetchMyDiary(
    @CurrentUser() currentUser: ICurrentUser,
  ){
    return await this.chatGPTService.findMyDiary({user : currentUser});
  }
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [ChatGPT])
  async fetchMyDiaryOne(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('id') id: string,
  ){
    return await this.chatGPTService.findMyDiaryOne({user : currentUser, id})
  }


  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async deleteMyDiary(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('id') id: string,
  ){
    console.log(currentUser)
    return await this.chatGPTService.delete({user : currentUser, id})
    
  }
}
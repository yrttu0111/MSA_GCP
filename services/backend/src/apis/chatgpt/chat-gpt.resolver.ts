import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ChatGPTService } from "./chat-gpt.service";
import { createChatInput } from "./dto/createChat.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { CurrentUser, ICurrentUser } from "src/commons/auth/gql-user.param";
import { ChatGPT } from "./entities/chat-gpt.entity";
import { UpdateChatInput } from "./dto/updateChat.input";

@Resolver()
export class ChatGPTResolver {
  constructor(private readonly chatGPTService: ChatGPTService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ChatGPT)
  async DiaryChatBot(
    @Args('createChatInput') createChatInput: createChatInput,
    @CurrentUser() currentUser: ICurrentUser,
    
  ) {
    return this.chatGPTService.create({createChatInput, user : currentUser});
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [ChatGPT])
  async fetchMyDiary(
    
    @CurrentUser() currentUser: ICurrentUser,
  ){
    return await this.chatGPTService.findMyDiary({user : currentUser});
  }
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => ChatGPT)
  async fetchMyDiaryOne(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('id') id: string,
  ){
    const result = await this.chatGPTService.findMyDiaryOne({user : currentUser, id})
    return result
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
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ChatGPT)
  async updateMyDiary(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('id') id: string,
    @Args('updateChatInput') updateChatInput: UpdateChatInput,
  ){
    const {ask} = updateChatInput
    if(ask === ''){
      throw new Error('내용을 입력해주세요')
    }
    const result = await this.chatGPTService.update({user : currentUser, id, updateChatInput})
    return result
  }
}
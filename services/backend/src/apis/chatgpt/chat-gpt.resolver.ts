import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ChatGPTService } from "./chat-gpt.service";
import { CreateCompletionDto } from "./dto/create-completion.dto";

@Resolver()
export class ChatGPTResolver {
  constructor(private readonly chatGPTService: ChatGPTService) {}

  @Mutation(() => String)
  async styleChatBot(
    @Args('createCompletionDto') createCompletionDto: CreateCompletionDto,
    
  ) {
    return this.chatGPTService.chatgptAxios({createCompletionDto});
  }
}
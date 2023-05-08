import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateChatInput {
    @Field(() => String)
    ask: string;
    
  }
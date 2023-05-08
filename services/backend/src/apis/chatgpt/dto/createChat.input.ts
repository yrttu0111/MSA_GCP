import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class createChatInput {
    @Field(() => String)
    ask: string;
    
  }
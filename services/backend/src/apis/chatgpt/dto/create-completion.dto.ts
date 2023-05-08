import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCompletionDto {
    @Field(() => String)
    ask: string;
    
  }
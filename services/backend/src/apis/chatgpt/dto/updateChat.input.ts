import { InputType, PartialType } from "@nestjs/graphql";
import { CreateCompletionDto } from "./createChat.input";


@InputType()
export class UpdateChatInput extends PartialType(CreateCompletionDto) {}
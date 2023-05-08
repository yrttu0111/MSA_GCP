import { InputType, PartialType } from "@nestjs/graphql";
import { CreateChatInput } from "./createChat.input";


@InputType()
export class UpdateChatInput extends PartialType(CreateChatInput) {}
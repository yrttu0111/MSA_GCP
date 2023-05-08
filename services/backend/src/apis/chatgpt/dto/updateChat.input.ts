import { InputType, PartialType } from "@nestjs/graphql";
import { CreateCompletionDto } from "./create-completion.dto";


@InputType()
export class UpdateChatInput extends PartialType(CreateCompletionDto) {}
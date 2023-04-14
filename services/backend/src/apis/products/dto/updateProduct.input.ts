import { CreateProductInput } from './createProduct.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}

//partialType null 허용
//pickType 고르고 싶은것만
//omitType 제거

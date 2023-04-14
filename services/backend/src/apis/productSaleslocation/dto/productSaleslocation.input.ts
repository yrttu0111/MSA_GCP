import { ProductSaleslocation } from 'src/apis/productSaleslocation/productSaleslocation.entity';
import { Field, Float, InputType, OmitType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {}

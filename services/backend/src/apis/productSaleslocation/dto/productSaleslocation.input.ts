import { ProductSaleslocation } from 'src/apis/productSaleslocation/productSaleslocation.entity';
import { Field, Float, InputType, OmitType } from '@nestjs/graphql';
import { Column } from 'typeorm';

//entity에 있는 것을 input으로 받아서 사용 id 제외
@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {}

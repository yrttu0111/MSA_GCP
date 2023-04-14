import { ProductCategoryService } from './productCategory.service';
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

@Resolver()
export class ProductCategoryResolver {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}
  @Mutation(() => ProductCategory)
  async createProductCategory(
    @Args('name') name: string, //
  ) {
    const result = await this.productCategoryService.create({ name });
    return result;
  }
}

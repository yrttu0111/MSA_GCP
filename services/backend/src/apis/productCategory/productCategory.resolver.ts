import { ProductCategoryService } from './productCategory.service';
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

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
  @Query(() => [ProductCategory])
  async fetchProductCategories() {
    return await this.productCategoryService.findAll();
  }
  @Query(() => ProductCategory)
  async fetchProductCategory(
    @Args('name') name: string, //
  ) {
    return await this.productCategoryService.findOne({name});
  }
}

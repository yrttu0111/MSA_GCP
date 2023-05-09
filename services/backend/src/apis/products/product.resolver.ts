import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Inject, CACHE_MANAGER, UseGuards, HttpException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    // private readonly elasticsearchService: ElasticsearchService,

    // @Inject(CACHE_MANAGER)
    // private readonly cacheManager: Cache,
  ) {}

  //레디스 엘라스틱 서치 사용 시 빠른 검색을 위해 캐시를 사용한다.
  // @Query(() => [Product])
  // async fetchProducts(
  //   @Args({ name: 'search', nullable: true }) search: string,
  // ) {
    // console.time('메모리에 캐시된거 가져오기');
    // // 1. 레디스에 캐시 되어있는지
    // const productCache = await this.cacheManager.get(`products:${search}`);
    // console.timeEnd('메모리에 캐시된거 가져오기');
    // if (productCache) {
    //   return productCache;
    // }
    // // 2. 없다면 엘라스틱 서치에서 조회
    // console.time('디스크에 캐시된거 가져오기');
    // const result = await this.elasticsearchService.search({
    //   index: 'myproduct',
    //   query: {
    //     match: {
    //       name: search,
    //     },
    //   },
    // });
    // console.timeEnd('디스크에 캐시된거 가져오기');
    // const products = result.hits.hits.map((el: any) => ({
    //   id: el._source.id,
    //   name: el._source.name,
    //   price: el._source.price,
    // }));
    // // object 로 되서 내용 을 볼수 없음 -> json.stringify
    // // console.log(JSON.stringify(result, null, ' '));

    // // 3. 레디스에 조회결과 없으면 캐싱해놓기
    // await this.cacheManager.set(`products:${search}`, products, { ttl: 120 });
    // // 4. 브라우저에 리턴해주기

    // return products;

  //   return this.productService.findAll();
  // }

  @Query(() => [Product])
  async fetchProducts(
  ) {
    return this.productService.findAll();
  }
  @Query(() => Product)
  async fetchProduct(@Args('productId') productId: string) {
    const result = await this.productService.findOne({ productId });
    // console.log(result);
    return result;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @CurrentUser() currentUser: ICurrentUser
  ) {
    const result = await this.productService.create({ createProductInput , 
      user : currentUser
    });
    return result;
    
  }
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Product)
  async updateProduct( 
    @Args('productId') productId: string, 
    @Args('updateProductinput') updateProductinput: UpdateProductInput,
  ) {
    await this.productService.checkSoldout({ productId });
    return await this.productService.update({ productId, updateProductinput });
  }
  @Mutation(() => Boolean)
  async deleteProduct(@Args('productId') productId: string) {
    return this.productService.delete({ productId }); //
  }
}

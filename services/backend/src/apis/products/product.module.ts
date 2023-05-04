import { ProductTag } from 'src/apis/productTags/entities/productTags.entity';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/productSaleslocation.entity';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ProductCategory } from '../productCategory/entities/productCategory.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductSaleslocation, ProductTag, ProductCategory]),
    // ElasticsearchModule.register({
    //   node: 'http://elasticsearch:9200',
    // }),
  ],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}

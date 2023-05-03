import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly ProductCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create({ name }) {
    const result = await this.ProductCategoryRepository.save({ name });
    console.log(result);
    return result;
  }

  async findAll() {
    return await this.ProductCategoryRepository.find();
  }
  async findOne({ name }) {
    return await this.ProductCategoryRepository.findOne({where: { name }});
  }
}

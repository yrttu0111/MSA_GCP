import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { Repository } from 'typeorm';
export declare class ProductCategoryService {
    private readonly ProductCategoryRepository;
    constructor(ProductCategoryRepository: Repository<ProductCategory>);
    create({ name }: {
        name: any;
    }): Promise<{
        name: any;
    } & ProductCategory>;
}

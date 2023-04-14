import { ProductCategoryService } from './productCategory.service';
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
export declare class ProductCategoryResolver {
    private readonly productCategoryService;
    constructor(productCategoryService: ProductCategoryService);
    createProductCategory(name: string): Promise<{
        name: any;
    } & ProductCategory>;
}

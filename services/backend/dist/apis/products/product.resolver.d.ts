import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { createProductInput } from './dto/createProduct.input';
import { updateProductInput } from './dto/updateProduct.input';
export declare class ProductResolver {
    private readonly productService;
    constructor(productService: ProductService);
    fetchProducts(): Promise<Product[]>;
    fetchProduct(productId: string): Promise<Product>;
    createProduct(createProductInput: createProductInput): Promise<any>;
    updateProduct(productId: string, updateProductinput: updateProductInput): Promise<any>;
    deleteProduct(productId: string): Promise<boolean>;
}

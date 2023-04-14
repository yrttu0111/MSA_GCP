import { ProductSaleslocationInput } from 'src/apis/productSaleslocation/dto/productSaleslocation.input';
export declare class createProductInput {
    name: string;
    description: string;
    price: number;
    productSaleslocationInput: ProductSaleslocationInput;
    productCategoryId: string;
    productTags: string[];
}

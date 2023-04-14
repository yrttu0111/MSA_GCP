import { ProductTag } from 'src/apis/productTags/entities/productTags.entity';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/productSaleslocation.entity';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
export declare class ProductService {
    private readonly ProductRepository;
    private readonly ProductSaleslocationRepository;
    private readonly ProductTagRepository;
    constructor(ProductRepository: Repository<Product>, ProductSaleslocationRepository: Repository<ProductSaleslocation>, ProductTagRepository: Repository<ProductTag>);
    findAll(): Promise<Product[]>;
    findOne(productId: any): Promise<Product>;
    create({ createProductInput }: {
        createProductInput: any;
    }): Promise<any>;
    update({ productId, updateProductinput }: {
        productId: any;
        updateProductinput: any;
    }): Promise<any>;
    checkSoldout({ productId }: {
        productId: any;
    }): Promise<void>;
    delete({ productId }: {
        productId: any;
    }): Promise<boolean>;
}

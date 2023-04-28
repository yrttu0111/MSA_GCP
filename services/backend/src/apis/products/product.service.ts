import { ProductTag } from 'src/apis/productTags/entities/productTags.entity';
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productSaleslocation/productSaleslocation.entity';
import { Product } from './entities/product.entity';
import {
  Injectable,
  HttpException,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductInput } from './dto/createProduct.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,

    @InjectRepository(ProductSaleslocation)
    private readonly ProductSaleslocationRepository: Repository<ProductSaleslocation>,

    @InjectRepository(ProductTag)
    private readonly ProductTagRepository: Repository<ProductTag>,
  ) {}

  async findAll() {
    return await this.ProductRepository.find({
      where: { deletedAt: null },
      relations: ['productSaleslocation', 'productCategory', 'productTags','user'],
    });
  }
  async findOne({ productId }) {
    console.log(productId);
    const result = await this.ProductRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags','user'],
    });
    // console.log(result);
    return result;
  }

  async create({ createProductInput, user }) {
    //1. 상품만 등록
    // const result = await this.ProductRepository.save({
    //   //스프레드 연산자
    //   ...createProductInput,
    //   //하나하나 나열 하는 방식
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    // });
    // 2. 상품과 거래위치를 같이 등록하는경우 2개 테이블
    // console.log("user id",user.id)
    const {
      productSaleslocationInput,
      productCategoryId,
      productTags,
      ...product
    } = createProductInput;
    const result = await this.ProductSaleslocationRepository.save({
      ...productSaleslocationInput,
    });
    const result2 = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', ''); //
      //이미 등록된 태그인지 확인

      const prevTag = await this.ProductTagRepository.findOne({
        name: tagname,
      });
      if (prevTag) {
        result2.push(prevTag);
      } else {
        const newTag = await this.ProductTagRepository.save({ name: tagname }); 
        result2.push(newTag);
      }
    }

    const result3 = await this.ProductRepository.save({
      ...product,
      productSaleslocation: result, // result 통쨰로 넣기 vs id만 넣기
      productCategory: { id: productCategoryId },
      user: {id: user.id},
      productTags: result2,
    });
    return result3;
  }
  async update({ productId, updateProductinput }) {
    //모든 값을 내보내기 위해 안하면 바뀐값만 리턴됨
    const myproduct = await this.ProductRepository.findOne({
      where: { id: productId },
    });
    const newProduct = {
      ...myproduct,
      id: productId,
      ...updateProductinput,
    };
    return this.ProductRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    const product = await this.ProductRepository.findOne({
      where: { id: productId },
    });
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매완료된 상품입니다.');
      // if (product.isSoldout) {
      //   throw new HttpException(
      //     '이미 판매완료된 상품입니다.',
      //     HttpStatus.UNPROCESSABLE_ENTITY,
      //   );
    }
  }
  async delete({ productId }) {
    //1. 그냥 삭제
    // const result = this.ProductRepository.delete({ id: productId });
    // return (await result).affected ? true : false;

    //소프트딜리트 직접구현 - is deleted
    // this.ProductRepository.update({id:productId}, {isDeleted: true})

    //3. 소프트 삭제 직접 구현 시간 - deletedAt
    // this.ProductRepository.update({id:productId}, {deletedAt: new Date()})
    //4 소프트 삭제 typeorm 사용softRemove
    // const result = this.ProductRepository.softRemove({ id: productId }); //아이디로만 삭제가능
    // 5. 소프트 삭제 typeorm 사용softDelete
    const result = await this.ProductRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}

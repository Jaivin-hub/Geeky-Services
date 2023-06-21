import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private ProductRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private ProductImageRepository: Repository<ProductImage>,
  ) {}

  async create(createProductDto: CreateProductDto, product_images: any) {
    try {
      const newProduct = await this.ProductRepository.save(createProductDto);

      const productImages = await product_images?.map((items) => {
        const productImage = new ProductImage();
        productImage.image_filename = items.filename;
        productImage.product = newProduct;
        return productImage;
      });

      await this.ProductImageRepository.save(productImages);

      newProduct.images = productImages;

      const responseData = {
        message: 'Successfully created',
        data: {
          id: newProduct.id,
          product_name: newProduct.product_name,
          product_description: newProduct.product_description,
          category: newProduct.category,
          sub_Category: newProduct.sub_Category,
          amount: newProduct.amount,
          discount: newProduct.discount,
          offer_price: newProduct.offer_price,
          status: newProduct.status,
        },
      };

      return responseData;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const productsList = await this.ProductRepository.find({
        relations: ['images'],
      });
      if (productsList?.length > 0) {
        return { message: 'Data found successfully', data: productsList };
      } else {
        throw new NotFoundException('Products list not found');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Product> {
    return this.ProductRepository.findOne({
      where: { id },
      relations: ['images'],
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.ProductRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      await this.ProductRepository.update(id, updateProductDto);
      const updateProduct = await this.ProductRepository.findOneBy({ id });
      return { message: 'Sucessfully updated', data: updateProduct };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      await this.ProductRepository.delete(id);
      return { message: 'Sucessfully deleted' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

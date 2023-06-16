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

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private ProductRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.ProductRepository.create(createProductDto);
      await this.ProductRepository.save(product);
      return { message: 'Sucessfully created', data: product };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const productsList = await this.ProductRepository.find();
      if (productsList?.length > 0) {
        return { message: 'Data found successfully', data: productsList };
      } else {
        throw new NotFoundException('Products list not found');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.ProductRepository.findOneBy({ id });
      if (product) {
        return {
          message: 'Data found successfully',
          data: product,
        };
      } else {
        throw new NotFoundException('Products list not found');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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

import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private UserRepository: Repository<Customer>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = this.UserRepository.create(createCustomerDto);
      await this.UserRepository.save(customer);
      return customer;
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  findAll() {
    try {
      return this.UserRepository.find();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  findOne(id: number) {
    try {
      return this.UserRepository.findOneBy({ id });
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      const updateCustomer = await this.UserRepository.findOneBy({ id });
      console.log(updateCustomer);
      if (!updateCustomer) {
        throw new NotFoundException('Customer not found');
      }
      await this.UserRepository.update(id, updateCustomerDto);
      return this.UserRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      await this.UserRepository.delete(id);
      return 'Record deleted successfully';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

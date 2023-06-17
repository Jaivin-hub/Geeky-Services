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
    @InjectRepository(Customer) private customerModel: Repository<Customer>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = this.customerModel.create(createCustomerDto);
      await this.customerModel.save(customer);
      return customer;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const customerList = await this.customerModel.find();
      return {
        status: 200,
        allData: customerList,
        total: customerList.length,
        params: { currentPlan: '', q: '', role: '', status: '' },
        users: customerList,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findOne(id: number) {
    try {
      return this.customerModel.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      const updateCustomer = await this.customerModel.findOneBy({ id });
      if (!updateCustomer) {
        throw new NotFoundException('Customer not found');
      }
      await this.customerModel.update(id, updateCustomerDto);
      return this.customerModel.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      await this.customerModel.delete(id);
      return 'Record deleted successfully';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

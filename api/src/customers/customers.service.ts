import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    

  const existsCpf = await this.repository.findOne({
    where: {
      cpf: createCustomerDto.cpf,
    },
  });

  if (existsCpf) {
    throw new BadRequestException('CPF já cadastrado.');
  }
  
  const existMail = await this.repository.findOne({
    where: {
      email: createCustomerDto.email,
    },
  });

  if (existMail) {
    throw new BadRequestException('Email já cadastrado.');
  }


    const customer = this.repository.create(createCustomerDto);
    return this.repository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.repository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.repository.findOne({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('Cliente não encontrado.');
    }

    return customer;
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.findOne(id);

    Object.assign(customer, updateCustomerDto);

    return this.repository.save(customer);
  }

  async remove(id: number): Promise<void> {
    const customer = await this.findOne(id);

    await this.repository.remove(customer);
  }
}
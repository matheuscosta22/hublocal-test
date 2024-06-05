import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Companies } from './entities/companies.entity';
import { EntityManager, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Companies)
    private readonly companiesRepository: Repository<Companies>,
    private readonly entityManager: EntityManager,
    private jwtService: JwtService,
  ) {}
  async create(
    createCompanyDto: CreateCompanyDto,
    request: Request,
  ): Promise<Companies> {
    const company = new Companies({
      name: createCompanyDto.name,
      website: createCompanyDto.website,
      cnpj: createCompanyDto.cnpj,
      user: request['user'].sub,
    });
    await this.entityManager.save(company);
    return company;
  }

  async findAll(
    options: IPaginationOptions,
    request: Request,
  ): Promise<Pagination<Companies>> {
    const queryBuilder = this.companiesRepository
      .createQueryBuilder('companies')
      .where('companies.user_id = :user_id', { user_id: request['user'].sub });

    return await paginate<Companies>(queryBuilder, options);
  }

  async findOne(request: Request, id: number): Promise<Companies> {
    return await this.companiesRepository
      .createQueryBuilder('companies')
      .andWhere('companies.id = :id', { id: id })
      .andWhere('companies.user_id = :user_id', {
        user_id: request['user'].sub,
      })
      .getOne();
  }

  // update(id: number, updateCompanyDto: UpdateCompanyDto) {
  //   return `This action updates a #${id} company`;
  // }

  remove(request: Request, id: number): void {
    this.companiesRepository
      .createQueryBuilder('companies')
      .andWhere('companies.id = :id', { id: id })
      .andWhere('companies.user_id = :user_id', {
        user_id: request['user'].sub,
      })
      .delete()
      .execute();
  }
}

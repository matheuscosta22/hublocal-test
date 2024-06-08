import { Injectable } from '@nestjs/common';
import { CompanyDto } from './dto/create-company.dto';
import { Companies } from './entities/companies.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import {
  IPaginationOptions,
  Pagination,
  paginate,
  paginateRaw,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Companies)
    private readonly companiesRepository: Repository<Companies>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(
    createCompanyDto: CompanyDto,
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

  async findAllWithCountLocations(
    options: IPaginationOptions,
    request: Request,
  ): Promise<Pagination<Companies>> {
    const queryBuilder = this.companiesRepository
      .createQueryBuilder('companies')
      .where('companies.user_id = :user_id', { user_id: request['user'].sub })
      .leftJoin('companies.locations', 'location')
      .groupBy('companies.id')
      .select([
        'companies.id as id',
        'companies.name as name',
        'companies.website as website',
        'companies.cnpj as cnpj',
      ])
      .addSelect('COUNT(location)::INTEGER', 'count_locations');

    return await paginateRaw<Companies>(queryBuilder, options);
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

  async update(id: number, data: CompanyDto, request: Request) {
    await this.companiesRepository
      .createQueryBuilder('companies')
      .andWhere('companies.id = :id', { id: id })
      .andWhere('companies.user_id = :user_id', {
        user_id: request['user'].sub,
      })
      .update()
      .set({
        name: data.name,
        website: data.website,
        cnpj: data.cnpj,
      })
      .execute();
  }

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

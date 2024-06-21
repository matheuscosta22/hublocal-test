import { Injectable } from '@nestjs/common';
import { LocationDto } from './dto/location.dto';
import { Locations } from './entities/locations.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateLocationDto } from './dto/update-location.dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Locations)
    private readonly locationsRepository: Repository<Locations>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(data: LocationDto): Promise<Locations> {
    const location = new Locations({
      name: data.name,
      zip_code: data.zip_code,
      street: data.street,
      number: data.number,
      district: data.district,
      city: data.city,
      state: data.state,
      company: data.company_id,
    });
    await this.entityManager.save(location);
    return location;
  }

  async findOne(id: number): Promise<Locations> {
    return await this.locationsRepository
      .createQueryBuilder('locations')
      .andWhere('locations.id = :id', { id: id })
      .getOne();
  }

  async update(id: number, data: UpdateLocationDto) {
    await this.locationsRepository
      .createQueryBuilder('locations')
      .andWhere('locations.id = :id', { id: id })
      .update()
      .set({
        name: data.name,
        zip_code: data.zip_code,
        street: data.street,
        number: data.number,
        district: data.district,
        city: data.city,
        state: data.state,
      })
      .execute();
  }

  remove(id: number): void {
    this.locationsRepository
      .createQueryBuilder('locations')
      .andWhere('locations.id = :id', { id: id })
      .delete()
      .execute();
  }

  async findOneWithCompany(id: number, user_id: number): Promise<Locations> {
    return await this.locationsRepository
      .createQueryBuilder('locations')
      .leftJoinAndSelect('locations.company', 'company')
      .andWhere('locations.id = :id', { id: id })
      .andWhere('company.user_id = :user_id', { user_id: user_id })
      .getOne();
  }

  async findAllByCompanyId(
    options: IPaginationOptions,
    companyId: number,
  ): Promise<Pagination<Locations>> {
    const queryBuilder = this.locationsRepository
      .createQueryBuilder('locations')
      .where('locations.company_id = :companyId', { companyId: companyId });

    return await paginate<Locations>(queryBuilder, options);
  }
}

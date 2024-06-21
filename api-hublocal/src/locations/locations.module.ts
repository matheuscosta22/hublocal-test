import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locations } from './entities/locations.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { Companies } from 'src/companies/entities/companies.entity';
import { CompanyLocationsController } from './company-locations.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Locations]),
    TypeOrmModule.forFeature([Companies]),
  ],
  controllers: [LocationsController, CompanyLocationsController],
  providers: [LocationsService, CompaniesService],
})
export class LocationsModule {}

import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locations } from './entities/locations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Locations])],
  // controllers: [LocationsController],
  // providers: [LocationsService],
})
export class LocationsModule {}

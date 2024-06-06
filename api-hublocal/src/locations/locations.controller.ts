import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Req,
  Res,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationDto } from './dto/location.dto';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { CompaniesService } from 'src/companies/companies.service';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('locations')
@UseGuards(AuthGuard)
export class LocationsController {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly companiesService: CompaniesService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() data: LocationDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const companyIsFromAuthenticatedUser = await this.companiesService.findOne(
      request,
      +data.company_id,
    );
    if (!companyIsFromAuthenticatedUser) {
      return response.status(401).send();
    }

    return response.status(201).send(await this.locationsService.create(data));
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const location = await this.locationsService.findOneWithCompany(
      +id,
      request['user'].sub,
    );
    if (!location) {
      return response.status(401).send();
    }

    return response.status(200).send(location);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateLocationDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const location = await this.locationsService.findOneWithCompany(
      +id,
      request['user'].sub,
    );
    if (!location) {
      return response.status(401).send();
    }

    await this.locationsService.update(+id, data);
    return response.status(200).send();
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const location = await this.locationsService.findOneWithCompany(
      +id,
      request['user'].sub,
    );
    if (!location) {
      return response.status(401).send();
    }

    this.locationsService.remove(+id);
    return response.status(200).send();
  }
}

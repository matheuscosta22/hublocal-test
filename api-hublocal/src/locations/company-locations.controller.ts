import { CompaniesService } from 'src/companies/companies.service';
import { LocationsService } from './locations.service';
import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request, Response } from 'express';

@Controller('company-locations')
@UseGuards(AuthGuard)
export class CompanyLocationsController {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly companiesService: CompaniesService,
  ) {}

  @Get(':id')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Param('id') id: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const companyIsFromAuthenticatedUser = await this.companiesService.findOne(
      request,
      +id,
    );
    if (!companyIsFromAuthenticatedUser) {
      return response.status(401).send();
    }

    const locations = await this.locationsService.findAllByCompanyId(
      {
        page,
        limit,
        route: '/company-locations/' + id,
      },
      +id,
    );

    return response.status(200).send(locations);
  }
}

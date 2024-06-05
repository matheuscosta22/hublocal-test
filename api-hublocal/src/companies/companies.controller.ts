import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpCode,
  Req,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request, Response } from 'express';

@Controller('companies')
@UseGuards(AuthGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() data: CreateCompanyDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const company = await this.companiesService.create(data, request);

    return response.status(201).send(company);
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return response.status(200).send(
      await this.companiesService.findAll(
        {
          page,
          limit,
          route: '/companies',
        },
        request,
      ),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return response
      .status(200)
      .send(await this.companiesService.findOne(request, +id));
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
  //   return this.companiesService.update(+id, updateCompanyDto);
  // }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    this.companiesService.remove(request, +id);
    return response.status(200).send();
  }
}

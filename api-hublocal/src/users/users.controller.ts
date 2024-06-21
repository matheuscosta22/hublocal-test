import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateUserDto, @Res() response: Response) {
    const userExists = await this.usersService.existsWithEmail(data.email);
    if (!userExists) {
      return response.status(201).send(await this.usersService.create(data));
    }

    return response.status(422).send({ error: 'User alredy exists' });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}

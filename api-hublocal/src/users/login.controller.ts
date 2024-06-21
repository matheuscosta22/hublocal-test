import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() data: LoginDto, @Res() response: Response) {
    const authorized = await this.usersService.authorize(data);
    if (!authorized.access_token) {
      return response.status(401).send({ error: 'Unauthorized' });
    }

    return response.status(200).send(authorized);
  }
}

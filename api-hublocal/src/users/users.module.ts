import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { LoginController } from './login.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController, LoginController],
  providers: [UsersService],
})
export class UsersModule {}

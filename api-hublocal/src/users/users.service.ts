import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly entityManager: EntityManager,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const user = new Users({
      name: createUserDto.name,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
    await this.entityManager.save(user);
    return user;
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async existsWithEmail(email: string): Promise<boolean> {
    return await this.usersRepository.exists({
      where: {
        email: email,
      },
    });
  }

  async authorize(data: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return {
        access_token: '',
      };
    }

    if (await bcrypt.compare(data.password, user.password)) {
      const payload = { sub: user.id, username: user.email };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    return {
      access_token: '',
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}

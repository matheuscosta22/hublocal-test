import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConstants } from './users/jwtConstants';
import { JwtModule } from '@nestjs/jwt';
import { CompaniesModule } from './companies/companies.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
    DatabaseModule,
    UsersModule,
    CompaniesModule,
    LocationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

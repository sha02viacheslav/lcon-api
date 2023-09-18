import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.POSTGRESHOST,
      port: (process.env.POSTGRESPORT as any) || 5432,
      username: process.env.POSTGRESUSERNAME,
      password: process.env.POSTGRESPASSWORD,
      database: process.env.POSTGRESDBNAME,
      entities: [],
      autoLoadEntities: true,
    };
  }
}

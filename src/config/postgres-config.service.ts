import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {Secrets} from "../main";

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.POSTGRESHOST,
      port: (process.env.POSTGRESPORT as any) || 5432,
      username: Secrets.postGresDbUser,
      password: Secrets.postGresDbPassword,
      database: process.env.POSTGRESDBNAME,
      entities: [],
      autoLoadEntities: true,
    };
  }
}

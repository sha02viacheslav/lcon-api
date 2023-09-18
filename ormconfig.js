/* eslint-disable @typescript-eslint/no-var-requires*/
const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;
module.exports = {
  name: 'default',
  type: 'postgres',
  synchronize: false,
  autoLoadEntities: true,
  logging: true,
  cache: true,
  timezone: 'UTC',
  host: process.env.POSTGRESHOST || '127.0.0.1',
  port: process.env.POSTGRESPORT || 5432,
  username: process.env.POSTGRESUSERNAME || 'postgres',
  password: process.env.POSTGRESPASSWORD,
  database: process.env.POSTGRESDBNAME || 'postgres',
  entities: ['dist/entities/**/*.entity.*'],
  namingStrategy: new SnakeNamingStrategy(),
  migrations: ['dist/migration/**/*.*'],
  cli: {
    migrationsDir: 'src/migration',
  },
  migrationsTableName: 'lcon_migrations',
};

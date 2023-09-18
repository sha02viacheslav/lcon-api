import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cors = require('cors');
import * as dotenv from 'dotenv';
import session = require('express-session');
import { AppModule } from './app.module';
import { ApplicationConfig } from './config/app-config';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', true);
  app.use(session(ApplicationConfig.session));
  app.use(cors(ApplicationConfig.cors));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

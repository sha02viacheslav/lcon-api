import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cors = require('cors');
import * as dotenv from 'dotenv';
import session = require('express-session');
import { AppModule } from './app.module';
import { ApplicationConfig } from './config/app-config';
import { ISecrets } from "./interfaces/secrets.interface";
import { getSecrets } from "./utility/saas";

export let Secrets: ISecrets;

dotenv.config();
async function bootstrap() {
  Secrets = await getSecrets();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', true);
  app.use(session((await ApplicationConfig()).session));
  app.use(cors((await ApplicationConfig()).cors));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

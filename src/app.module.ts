import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailConfig } from './config/mailer-config';
import { MongooseConfigService } from './config/mongo-config.service';
import { DatabaseModule } from './database.module';
import { AuthController } from './routes/auth/auth.controller';
import { AuthModule } from './routes/auth/auth.module';
import { LconModule } from './routes/lcon/lcon.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    LconModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    MailerModule.forRoot(MailConfig()),
  ],
  controllers: [AuthController, AppController],
  providers: [AppService],
})
export class AppModule {}

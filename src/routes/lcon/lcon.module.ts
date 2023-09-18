import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LconController } from './lcon.controller';
import { LconService } from './lcon.service';
import { LconSummaryReport } from '../../entities/lcon-summary-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LconSummaryReport])],
  controllers: [LconController],
  providers: [LconService],
})
export class LconModule {}

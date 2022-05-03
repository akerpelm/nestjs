import { Module } from '@nestjs/common';
import { ReportModule } from 'src/report/report.module';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';

@Module({
  imports: [ReportModule], //all exports from report.module
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}

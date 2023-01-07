import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';

@Module({
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}

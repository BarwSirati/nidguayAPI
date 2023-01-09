import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import { EducationModule } from '../education/education.module';
import { CreditModule } from '../credit/credit.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [EducationModule, CreditModule, UserModule],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}

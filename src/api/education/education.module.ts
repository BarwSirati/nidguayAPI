import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';

@Module({
  controllers: [EducationController],
  providers: [EducationService]
})
export class EducationModule {}

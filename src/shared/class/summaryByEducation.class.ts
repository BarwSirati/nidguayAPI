import { IsNumber } from 'class-validator';

export class SummaryByEducation {
  @IsNumber()
  educationId: number;

  @IsNumber()
  total: number;
}

import { IsNumber } from 'class-validator';

export class creditSum {
  @IsNumber()
  totalCredit: number;
}

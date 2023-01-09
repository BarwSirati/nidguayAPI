import { IsNumber, IsString } from 'class-validator';

export class SummaryClass {
  @IsString()
  typeCourse: string;

  @IsString()
  note: string;

  @IsNumber()
  credit: number;

  @IsNumber()
  total: number;
}

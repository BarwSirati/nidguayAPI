import { IsString } from 'class-validator';

export class FindCreditClass {
  @IsString()
  credit_typeCourse: string;

  @IsString()
  credit_note: string;

  @IsString()
  sum: string;
}

import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class Gened {
  @IsNumber()
  basic: number;
  @IsNumber()
  language: number;
  @IsNumber()
  faculty: number;
  @IsNumber()
  elective: number;
}

class Specific {
  @IsNumber()
  core: number;
  @IsNumber()
  specialized: number;
  @IsNumber()
  options: number;
  @IsNumber()
  branch_elective: number;
}

export class CreditClass {
  @IsNumber()
  total: number;

  @Type(() => Gened)
  gened: Gened;

  @Type(() => Specific)
  specific: Specific;

  @IsNumber()
  free_electives: number;
}

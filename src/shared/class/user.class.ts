import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { CreditClass } from './credit.class';
import { CreditInterface } from '../interfaces/credit.interface';

export class UserClass {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  faculty: string;

  @IsString()
  branch: string;

  @Type(() => CreditClass)
  credit: CreditInterface;
}

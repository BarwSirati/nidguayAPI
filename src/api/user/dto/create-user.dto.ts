import { Type } from 'class-transformer';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { CreditClass } from '../../../shared/class/credit.class';
import { CreditInterface } from '../../../shared/interfaces/credit.interface';

export class CreateUserDto {
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  id: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsNumber()
  facultyId: number;

  @IsNumber()
  branchId: number;

  @Type(() => CreditClass)
  credit: CreditInterface;
}

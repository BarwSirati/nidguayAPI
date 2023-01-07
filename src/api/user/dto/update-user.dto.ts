import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreditClass } from '../../../shared/class/credit.class';
import { CreditInterface } from '../../../shared/interfaces/credit.interface';

export class UpdateUserDto {
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsNumber()
  @IsOptional()
  facultyId?: number;

  @IsNumber()
  @IsOptional()
  branchId?: number;

  @Type(() => CreditClass)
  @IsOptional()
  credit?: CreditInterface;
}

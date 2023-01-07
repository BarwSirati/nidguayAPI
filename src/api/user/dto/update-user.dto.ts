import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  facultyId?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  branchId?: number;

  @ApiProperty()
  @Type(() => CreditClass)
  @IsOptional()
  credit?: CreditInterface;
}

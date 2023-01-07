import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { CreditClass } from '../../../shared/class/credit.class';
import { CreditInterface } from '../../../shared/interfaces/credit.interface';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNumber()
  facultyId: number;

  @ApiProperty()
  @IsNumber()
  branchId: number;

  @ApiProperty()
  @Type(() => CreditClass)
  credit: CreditInterface;
}

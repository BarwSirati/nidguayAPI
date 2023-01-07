import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCourseSubjectDto {
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
  @IsNumber()
  @IsOptional()
  credit?: number;
}

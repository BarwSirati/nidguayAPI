import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCourseSubjectDto {
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  credit?: number;
}

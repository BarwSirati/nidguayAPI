import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCourseSubjectDto {
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  credit: number;
}

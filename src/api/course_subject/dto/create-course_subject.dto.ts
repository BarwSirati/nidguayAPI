import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCourseSubjectDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  credit: number;
}

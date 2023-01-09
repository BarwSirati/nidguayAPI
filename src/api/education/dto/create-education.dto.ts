import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  userId: string;

  @ApiProperty()
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsNumber()
  semester: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
export class UpdateEducationDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  year?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  semester?: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFacultyDto {
  @IsString()
  @ApiProperty()
  name: string;
}

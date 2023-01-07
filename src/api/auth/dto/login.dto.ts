import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

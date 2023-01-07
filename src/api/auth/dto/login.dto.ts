import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  username: string;

  @IsString()
  password: string;
}

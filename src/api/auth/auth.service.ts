import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<JsonWebKey> {
    const user = await this.userService.findOne(loginDto.username);
    if (!user) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    const compare = await bcrypt.compare(loginDto.password, user.password);
    if (!compare) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.signToken(user.id, user.roles);
  }

  async signToken(userId: string, role: string): Promise<object> {
    const payload = {
      sub: userId,
      role: role,
    };
    const token = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: 60 * 60 * 24 * 7,
        secret: process.env.SECRET_KEY,
      }),
    ]);
    return {
      access_token: token,
    };
  }
}

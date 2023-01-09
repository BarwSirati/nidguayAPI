import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';

import { User } from '../../user/entities/user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
dotenv.config();
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: { sub: string; role: string }): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
      });
      if (user) return user;
      throw new HttpException('Unathorize', HttpStatus.UNAUTHORIZED);
    } catch (err) {
      throw new HttpException('Unathorize', HttpStatus.UNAUTHORIZED);
    }
  }
}

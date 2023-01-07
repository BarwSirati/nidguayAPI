import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FacultyModule } from '../faculty/faculty.module';
import { BranchModule } from '../branch/branch.module';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FacultyModule, BranchModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}

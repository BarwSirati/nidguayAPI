import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { HttpException, HttpExceptionOptions } from '@nestjs/common/exceptions';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from 'src/shared/interfaces/role.interface';
import { RolesGuard } from '../auth/guard/roles.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';

@Controller('user')
@ApiTags('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: User): Promise<User> {
    if (user.id !== id && user.roles === 'user')
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<User> {
    if (user.id !== id && user.roles === 'user')
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return await this.userService.update(id, updateUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<HttpExceptionOptions> {
    return await this.userService.remove(id);
  }
}

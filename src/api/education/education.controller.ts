import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { ApiTags } from '@nestjs/swagger';
import { Education } from './entities/education.entity';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from 'src/shared/interfaces/role.interface';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('education')
@ApiTags('education')
@UseGuards(JwtGuard)
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  async create(
    @Body() createEducationDto: CreateEducationDto,
    @GetUser() user: User,
  ): Promise<Education> {
    if (user.id !== createEducationDto.userId && user.roles === 'user')
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return await this.educationService.create(createEducationDto);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get()
  async findAll(): Promise<Education[]> {
    return await this.educationService.findAll();
  }

  @Get('/user/:id')
  async findByUserId(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Education> {
    if (user.id !== id && user.roles === 'user')
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const userId = user.id;
    return await this.educationService.findByUserId(userId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Education> {
    if (user.id !== id && user.roles === 'user')
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return await this.educationService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateEducationDto: UpdateEducationDto,
  ): Promise<Education> {
    if (user.id !== id && user.roles === 'user')
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return await this.educationService.update(+id, updateEducationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser() user: User) {
    if (user.id !== id && user.roles === 'user')
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return await this.educationService.remove(+id);
  }
}

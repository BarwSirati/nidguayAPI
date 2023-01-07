import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { CourseSubjectService } from './course_subject.service';
import { CreateCourseSubjectDto } from './dto/create-course_subject.dto';
import { UpdateCourseSubjectDto } from './dto/update-course_subject.dto';
import { CourseSubject } from './entities/course_subject.entity';
import { Role } from '../../shared/interfaces/role.interface';

@Controller('courseSubject')
@ApiTags('courseSubject')
export class CourseSubjectController {
  constructor(private readonly courseSubjectService: CourseSubjectService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() createCourseSubjectDto: CreateCourseSubjectDto) {
    return await this.courseSubjectService.create(createCourseSubjectDto);
  }

  @Get()
  async findAll(): Promise<CourseSubject[]> {
    return await this.courseSubjectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CourseSubject> {
    return await this.courseSubjectService.findOne(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseSubjectDto: UpdateCourseSubjectDto,
  ): Promise<CourseSubject> {
    return this.courseSubjectService.update(id, updateCourseSubjectDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.courseSubjectService.remove(id);
  }
}

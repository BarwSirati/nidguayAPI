import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseSubjectService } from './course_subject.service';
import { CreateCourseSubjectDto } from './dto/create-course_subject.dto';
import { UpdateCourseSubjectDto } from './dto/update-course_subject.dto';
import { CourseSubject } from './entities/course_subject.entity';

@Controller('courseSubject')
@ApiTags('courseSubject')
export class CourseSubjectController {
  constructor(private readonly courseSubjectService: CourseSubjectService) {}

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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseSubjectDto: UpdateCourseSubjectDto,
  ): Promise<CourseSubject> {
    return this.courseSubjectService.update(id, updateCourseSubjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.courseSubjectService.remove(id);
  }
}

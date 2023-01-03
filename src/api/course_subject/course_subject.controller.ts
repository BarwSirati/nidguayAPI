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

@Controller('/api/course-subject')
@ApiTags('course-subject')
export class CourseSubjectController {
  constructor(private readonly courseSubjectService: CourseSubjectService) {}

  @Post()
  create(@Body() createCourseSubjectDto: CreateCourseSubjectDto) {
    return this.courseSubjectService.create(createCourseSubjectDto);
  }

  @Get()
  findAll() {
    return this.courseSubjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseSubjectService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseSubjectDto: UpdateCourseSubjectDto,
  ) {
    return this.courseSubjectService.update(+id, updateCourseSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseSubjectService.remove(+id);
  }
}

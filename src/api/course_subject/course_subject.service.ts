import { Injectable } from '@nestjs/common';
import { CreateCourseSubjectDto } from './dto/create-course_subject.dto';
import { UpdateCourseSubjectDto } from './dto/update-course_subject.dto';

@Injectable()
export class CourseSubjectService {
  create(createCourseSubjectDto: CreateCourseSubjectDto) {
    return 'This action adds a new courseSubject';
  }

  findAll() {
    return `This action returns all courseSubject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseSubject`;
  }

  update(id: number, updateCourseSubjectDto: UpdateCourseSubjectDto) {
    return `This action updates a #${id} courseSubject`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseSubject`;
  }
}

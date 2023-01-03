import { Module } from '@nestjs/common';
import { CourseSubjectService } from './course_subject.service';
import { CourseSubjectController } from './course_subject.controller';

@Module({
  controllers: [CourseSubjectController],
  providers: [CourseSubjectService],
})
export class CourseSubjectModule {}

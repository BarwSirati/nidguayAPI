import { Module } from '@nestjs/common';
import { CourseSubjectService } from './course_subject.service';
import { CourseSubjectController } from './course_subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseSubject } from './entities/course_subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseSubject])],
  controllers: [CourseSubjectController],
  providers: [CourseSubjectService],
  exports: [CourseSubjectService],
})
export class CourseSubjectModule {}

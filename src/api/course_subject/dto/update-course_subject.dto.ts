import { PartialType } from '@nestjs/swagger';
import { CreateCourseSubjectDto } from './create-course_subject.dto';

export class UpdateCourseSubjectDto extends PartialType(
  CreateCourseSubjectDto,
) {}

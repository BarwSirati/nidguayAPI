import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BranchModule } from './branch/branch.module';
import { FacultyModule } from './faculty/faculty.module';
import { CourseSubjectModule } from './course_subject/course_subject.module';

@Module({
  imports: [UserModule, BranchModule, FacultyModule, CourseSubjectModule],
})
export class ApiModule {}

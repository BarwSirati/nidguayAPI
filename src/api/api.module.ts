import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BranchModule } from './branch/branch.module';
import { FacultyModule } from './faculty/faculty.module';
import { CourseSubjectModule } from './course_subject/course_subject.module';
import { CreditModule } from './credit/credit.module';
import { SummaryModule } from './summary/summary.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    BranchModule,
    FacultyModule,
    CourseSubjectModule,
    CreditModule,
    SummaryModule,
    AuthModule,
  ],
})
export class ApiModule {}

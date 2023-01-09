import { Module } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credit } from './entities/credit.entity';
import { UserModule } from '../user/user.module';
import { EducationModule } from '../education/education.module';
import { CourseSubjectModule } from '../course_subject/course_subject.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Credit]),
    UserModule,
    EducationModule,
    CourseSubjectModule,
  ],
  controllers: [CreditController],
  providers: [CreditService],
})
export class CreditModule {}

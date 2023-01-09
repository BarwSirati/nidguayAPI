import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { FindCreditClass } from 'src/shared/class/findCredit.class';
import { DataSource, Repository } from 'typeorm';
import { CourseSubjectService } from '../course_subject/course_subject.service';
import { EducationService } from '../education/education.service';
import { UserService } from '../user/user.service';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';
import { Credit } from './entities/credit.entity';

@Injectable()
export class CreditService {
  constructor(
    private userService: UserService,
    private educationService: EducationService,
    private courseSubjectService: CourseSubjectService,
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Credit) private creditRepository: Repository<Credit>,
  ) {}
  async create(
    createCreditDto: CreateCreditDto,
    userId: string,
  ): Promise<Credit> {
    try {
      const education = await this.educationService.findOne(
        createCreditDto.educationId,
      );
      const courseSubject = await this.courseSubjectService.findOne(
        createCreditDto.courseSubjectId,
      );

      const user = await this.userService.findOne(userId);
      if (
        education === undefined ||
        courseSubject === undefined ||
        user === undefined
      )
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

      const credit: Credit = {
        ...createCreditDto,
        user: user,
        education: education,
        courseSubject: courseSubject,
      };
      return this.creditRepository.save(credit);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async creditSumByYear(educationId: number) {
    const sum = await this.creditRepository
      .createQueryBuilder('credit')
      .leftJoinAndSelect('credit.courseSubject', 'courseSubject')
      .where('credit.educationId= :educationId', { educationId: educationId })
      .select('SUM(courseSubject.credit)', 'totalCredit')
      .getRawOne();
    return sum;
  }

  async findAll(userId: string): Promise<FindCreditClass[]> {
    const credit = await this.creditRepository
      .createQueryBuilder('credit')
      .leftJoinAndSelect('credit.courseSubject', 'courseSubject')
      .select(['credit.typeCourse', 'credit.note', 'SUM(courseSubject.credit)'])
      .groupBy('credit.typeCourse')
      .addGroupBy('credit.note')
      .where('credit.userId= :userId', { userId: userId })
      .getRawMany();
    return credit;
  }

  async findOne(id: number, userId: string): Promise<Credit[]> {
    const user = await this.userService.findOne(userId);
    const education = await this.educationService.findOne(id);
    if (user === undefined || education === undefined)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const credit = await this.creditRepository.find({
      where: { education: { id: id } },
      relations: { education: true, courseSubject: true },
      order: { id: 'ASC' },
    });

    return credit;
  }

  async update(id: number, updateCreditDto: UpdateCreditDto): Promise<Credit> {
    try {
      const credit = await this.creditRepository.findOne({
        where: { id: id },
      });
      if (credit) {
        const newCredit = new Credit();
        if (updateCreditDto.educationId) {
          const education = await this.educationService.findOne(
            updateCreditDto.educationId,
          );
          if (education === undefined)
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          newCredit.education = education;
          delete updateCreditDto.educationId;
        }
        if (updateCreditDto.courseSubjectId) {
          const courseSubject = await this.courseSubjectService.findOne(
            updateCreditDto.courseSubjectId,
          );
          if (courseSubject === undefined)
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          newCredit.courseSubject = courseSubject;
          delete updateCreditDto.courseSubjectId;
        }

        const updateCredit: Credit = {
          ...updateCreditDto,
          ...newCredit,
        };
        await this.creditRepository.update(id, updateCredit);
        return await this.creditRepository.findOne({ where: { id: id } });
      }
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const fetch = await this.creditRepository.findOne({ where: { id: id } });
    if (fetch) {
      await this.creditRepository.delete(id);
      throw new HttpException('OK', HttpStatus.OK);
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}

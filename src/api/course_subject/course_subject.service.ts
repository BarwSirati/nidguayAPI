import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseSubjectDto } from './dto/create-course_subject.dto';
import { UpdateCourseSubjectDto } from './dto/update-course_subject.dto';
import { CourseSubject } from './entities/course_subject.entity';

@Injectable()
export class CourseSubjectService {
  constructor(
    @InjectRepository(CourseSubject)
    private courseSubjectRepository: Repository<CourseSubject>,
  ) {}
  async create(createCourseSubjectDto: CreateCourseSubjectDto) {
    try {
      const courseSubject = await this.findOne(createCourseSubjectDto.id);
      if (courseSubject)
        throw new HttpException('Conflict', HttpStatus.CONFLICT);
      const createCourseSubject = await this.courseSubjectRepository.create(
        createCourseSubjectDto,
      );
      return this.courseSubjectRepository.save(createCourseSubject);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<CourseSubject[]> {
    const courseSubject = await this.courseSubjectRepository.find();
    return courseSubject;
  }

  async findOne(id: string): Promise<CourseSubject> {
    const courseSubject = await this.courseSubjectRepository.findOne({
      where: { id: id },
    });
    if (courseSubject) return courseSubject;
  }

  async update(
    id: string,
    updateCourseSubjectDto: UpdateCourseSubjectDto,
  ): Promise<CourseSubject> {
    try {
      const fetch = await this.findOne(id);
      if (fetch) {
        await this.courseSubjectRepository.update(id, updateCourseSubjectDto);
        return await this.findOne(id);
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    } catch (err) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    const fetch = await this.findOne(id);
    if (fetch) {
      await this.courseSubjectRepository.delete(id);
      throw new HttpException('OK', HttpStatus.OK);
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}

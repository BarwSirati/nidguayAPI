import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { Faculty } from './entities/faculty.entity';

@Injectable()
export class FacultyService {
  constructor(
    @InjectRepository(Faculty) private facultyRepository: Repository<Faculty>,
  ) {}
  async create(createFacultyDto: CreateFacultyDto): Promise<Faculty> {
    try {
      const faculty = await this.facultyRepository.create(createFacultyDto);
      return this.facultyRepository.save(faculty);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Faculty[]> {
    return await this.facultyRepository.find();
  }

  async findOne(id: number): Promise<Faculty> {
    const faculty = await this.facultyRepository.findOne({ where: { id: id } });
    if (faculty) {
      return faculty;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  async update(
    id: number,
    updateFacultyDto: UpdateFacultyDto,
  ): Promise<Faculty> {
    try {
      const fetch = await this.findOne(id);
      if (fetch) {
        await this.facultyRepository.update(id, updateFacultyDto);
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

  async remove(id: number) {
    const fetch = await this.findOne(id);
    if (fetch) {
      await this.facultyRepository.delete(id);
      return new HttpException('OK', HttpStatus.OK);
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}

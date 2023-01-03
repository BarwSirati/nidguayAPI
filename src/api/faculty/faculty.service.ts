import { Injectable } from '@nestjs/common';
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
  create(createFacultyDto: CreateFacultyDto) {
    return 'This action adds a new faculty';
  }

  findAll() {
    return this.facultyRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} faculty`;
  }

  update(id: number, updateFacultyDto: UpdateFacultyDto) {
    return `This action updates a #${id} faculty`;
  }

  remove(id: number) {
    return `This action removes a #${id} faculty`;
  }
}

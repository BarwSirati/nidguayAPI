import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Education } from './entities/education.entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
    private userService: UserService,
  ) {}
  async create(createEducationDto: CreateEducationDto): Promise<Education> {
    try {
      const user = await this.userService.findOne(createEducationDto.userId);
      const education = await this.educationRepository.findOne({
        where: {
          user: { id: createEducationDto.userId },
          year: createEducationDto.year,
          semester: createEducationDto.semester,
        },
      });
      if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      if (education) throw new HttpException('CONFLICT', HttpStatus.CONFLICT);
      const newEducation: Education = {
        ...createEducationDto,
        user: user,
      };

      return this.educationRepository.save(newEducation);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Education[]> {
    const education = await this.educationRepository.find({
      relations: { user: true },
    });
    return education;
  }

  async findOne(id: number): Promise<Education> {
    const education = await this.educationRepository.findOne({
      where: { id: id },
      relations: { user: true },
    });
    if (education) return education;
  }

  async findByUserId(userId: string): Promise<Education[]> {
    const education = await this.educationRepository.find({
      where: { user: { id: userId } },
      order: { year: 'ASC' },
      relations: { user: true },
    });
    if (education) return education;
  }

  async update(
    id: number,
    updateEducationDto: UpdateEducationDto,
  ): Promise<Education> {
    try {
      const fetch = await this.findOne(id);
      if (Object.keys(fetch).length !== 0) {
        await this.educationRepository.update(id, updateEducationDto);
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
      await this.educationRepository.delete(id);
      throw new HttpException('OK', HttpStatus.OK);
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}

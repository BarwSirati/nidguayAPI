import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpExceptionOptions } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchService } from '../branch/branch.service';
import { FacultyService } from '../faculty/faculty.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../../shared/interfaces/role.interface';

@Injectable()
export class UserService {
  constructor(
    private facultyService: FacultyService,
    private branchService: BranchService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.findOne(createUserDto.id);
      if (user) throw new HttpException('Conflict', HttpStatus.CONFLICT);
      const faculty = await this.facultyService.findOne(
        createUserDto.facultyId,
      );
      const branch = await this.branchService.findOne(createUserDto.branchId);

      if (faculty === undefined || branch === undefined)
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

      const salt = 12;
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
      const newUser: User = {
        ...createUserDto,
        branch: branch,
        faculty: faculty,
      };
      return this.userRepository.save(newUser);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<User[]> {
    const user = await this.userRepository.find({
      relations: { faculty: true, branch: true },
      where: { roles: Role.User },
    });
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: { faculty: true, branch: true },
    });
    if (user) return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const fetch = await this.findOne(id);
      if (fetch) {
        const newUser = new User();
        if (updateUserDto.id) {
          const user = await this.findOne(updateUserDto.id);
          if (user) throw new HttpException('Conflict', HttpStatus.CONFLICT);
        }
        if (updateUserDto.password) {
          const salt = 12;
          updateUserDto.password = await bcrypt.hash(
            updateUserDto.password,
            salt,
          );
        }

        if (updateUserDto.branchId) {
          const branch = await this.branchService.findOne(
            updateUserDto.branchId,
          );
          if (branch === undefined)
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          newUser.branch = branch;
          delete updateUserDto.branchId;
        }

        if (updateUserDto.facultyId) {
          const faculty = await this.facultyService.findOne(
            updateUserDto.facultyId,
          );
          if (faculty === undefined)
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

          newUser.faculty = faculty;
          delete updateUserDto.facultyId;
        }

        const user: User = {
          ...updateUserDto,
          ...newUser,
        };

        await this.userRepository.update(id, user);
        if (updateUserDto.id) return await this.findOne(updateUserDto.id);
        else return await this.findOne(id);
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    } catch (err) {
      throw new HttpException(
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<HttpExceptionOptions> {
    const fetch = await this.findOne(id);
    if (fetch) {
      await this.userRepository.delete(id);
      throw new HttpException('OK', HttpStatus.OK);
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}

import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './entities/branch.entity';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch) private branchRepository: Repository<Branch>,
  ) {}
  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    try {
      const createBranch = await this.branchRepository.create(createBranchDto);
      return this.branchRepository.save(createBranch);
    } catch (err) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Branch[]> {
    const branch = await this.branchRepository.find();
    return branch;
  }

  async findOne(id: number): Promise<Branch> {
    const branch = await this.branchRepository.findOne({ where: { id: id } });
    if (branch) return branch;
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateBranchDto: UpdateBranchDto): Promise<Branch> {
    try {
      const fetch = await this.findOne(id);
      if (fetch) {
        await this.branchRepository.update(id, updateBranchDto);
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
      await this.branchRepository.delete(id);
      throw new HttpException('OK', HttpStatus.OK);
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}

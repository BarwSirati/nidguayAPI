import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/shared/interfaces/role.interface';
import { Roles } from '../auth/decorator/roles.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './entities/branch.entity';

@Controller('branch')
@ApiTags('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() createBranchDto: CreateBranchDto): Promise<Branch> {
    return await this.branchService.create(createBranchDto);
  }

  @Get()
  async findAll(): Promise<Branch[]> {
    return await this.branchService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Branch> {
    return await this.branchService.findOne(+id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDto,
  ): Promise<Branch> {
    return await this.branchService.update(+id, updateBranchDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.branchService.remove(+id);
  }
}

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
import { FacultyService } from './faculty.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { ApiTags } from '@nestjs/swagger';
import { Faculty } from './entities/faculty.entity';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../../shared/interfaces/role.interface';

@Controller('faculty')
@ApiTags('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() createFacultyDto: CreateFacultyDto): Promise<Faculty> {
    return await this.facultyService.create(createFacultyDto);
  }

  @Get()
  async findAll(): Promise<Faculty[]> {
    return await this.facultyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Faculty> {
    return await this.facultyService.findOne(+id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFacultyDto: UpdateFacultyDto,
  ): Promise<Faculty> {
    return await this.facultyService.update(+id, updateFacultyDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.facultyService.remove(+id);
  }
}

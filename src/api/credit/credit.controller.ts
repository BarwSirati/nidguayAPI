import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { User } from '../user/entities/user.entity';
import { CreditService } from './credit.service';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';
import { Credit } from './entities/credit.entity';

@Controller('credit')
@ApiTags('credit')
@UseGuards(JwtGuard)
export class CreditController {
  constructor(private readonly creditService: CreditService) {}

  @Post()
  async create(@Body() createCreditDto: CreateCreditDto): Promise<Credit> {
    return await this.creditService.create(createCreditDto);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Credit[]> {
    return await this.creditService.findOne(+id, user.id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCreditDto: UpdateCreditDto,
  ): Promise<Credit> {
    return await this.creditService.update(+id, updateCreditDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.creditService.remove(+id);
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SummaryClass } from 'src/shared/class/summary.class';
import { SummaryByEducation } from 'src/shared/class/summaryByEducation.class';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { User } from '../user/entities/user.entity';
import { SummaryService } from './summary.service';

@Controller('summary')
@ApiTags('summary')
@UseGuards(JwtGuard)
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}
  @Get()
  async findAll(@GetUser() user: User): Promise<SummaryByEducation[]> {
    return await this.summaryService.findAll(user.id);
  }

  @Get('/type')
  async summary(@GetUser() user: User): Promise<SummaryClass[]> {
    return this.summaryService.summary(user.id);
  }
}

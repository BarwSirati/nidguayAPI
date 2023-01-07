import { Controller, Get, Param } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get()
  findAll() {
    return this.summaryService.findAll();
  }

  @Get(':year')
  findYear(@Param('year') year: string) {
    return this.summaryService.findYear(+year);
  }

  @Get(':year/:semester')
  findSpecific(
    @Param('year') year: string,
    @Param('semester') semester: string,
  ) {
    return this.summaryService.findSpecific(+year, +semester);
  }
}

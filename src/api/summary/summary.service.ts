import { Injectable } from '@nestjs/common';

@Injectable()
export class SummaryService {
  async findAll() {
    return `This action returns all summary`;
  }

  findYear(year: number) {
    return `${year}`;
  }

  findSpecific(year: number, semester: number) {
    return `${year} ${semester}`;
  }
}

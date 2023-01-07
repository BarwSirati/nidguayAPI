import { Test, TestingModule } from '@nestjs/testing';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';

describe('SummaryController', () => {
  let controller: SummaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummaryController],
      providers: [SummaryService],
    }).compile();

    controller = module.get<SummaryController>(SummaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

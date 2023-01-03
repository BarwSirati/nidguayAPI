import { Test, TestingModule } from '@nestjs/testing';
import { FacultyController } from './faculty.controller';
import { FacultyService } from './faculty.service';

describe('FacultyController', () => {
  let controller: FacultyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacultyController],
      providers: [FacultyService],
    }).compile();

    controller = module.get<FacultyController>(FacultyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

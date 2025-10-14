import { Test, TestingModule } from '@nestjs/testing';
import { DogAdoptionsController } from './dog-adoptions.controller';
import { DogAdoptionsService } from './dog-adoptions.service';

describe('DogAdoptionsController', () => {
  let controller: DogAdoptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogAdoptionsController],
      providers: [DogAdoptionsService],
    }).compile();

    controller = module.get<DogAdoptionsController>(DogAdoptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});


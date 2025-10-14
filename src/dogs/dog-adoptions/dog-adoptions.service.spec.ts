import { Test, TestingModule } from '@nestjs/testing';
import { DogAdoptionsService } from './dog-adoptions.service';

describe('DogAdoptionsService', () => {
  let service: DogAdoptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogAdoptionsService],
    }).compile();

    service = module.get<DogAdoptionsService>(DogAdoptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


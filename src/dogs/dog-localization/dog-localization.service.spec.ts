import { Test, TestingModule } from '@nestjs/testing';
import { DogLocalizationService } from './dog-localization.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('DogLocalizationService', () => {
  let service: DogLocalizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogLocalizationService, PrismaService],
    }).compile();

    service = module.get<DogLocalizationService>(DogLocalizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DogImagesService } from './dog-images.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DogImagesService', () => {
  let service: DogImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogImagesService, PrismaService],
    }).compile();

    service = module.get<DogImagesService>(DogImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

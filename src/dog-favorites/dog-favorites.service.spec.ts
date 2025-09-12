import { Test, TestingModule } from '@nestjs/testing';
import { DogFavoritesService } from './dog-favorites.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DogFavoritesService', () => {
  let service: DogFavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogFavoritesService, PrismaService],
    }).compile();

    service = module.get<DogFavoritesService>(DogFavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

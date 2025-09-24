import { Test, TestingModule } from '@nestjs/testing';
import { DogFavoritesService } from './dog-favorites.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('DogFavoritesService', () => {
  let service: DogFavoritesService;

  const mockPrismaService = {
    dogFavorite: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DogFavoritesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<DogFavoritesService>(DogFavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

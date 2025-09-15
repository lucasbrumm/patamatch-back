import { Test, TestingModule } from '@nestjs/testing';
import { PostFavoritesService } from './post-favorite.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('PostFavoritesService', () => {
  let service: PostFavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostFavoritesService, PrismaService],
    }).compile();

    service = module.get<PostFavoritesService>(PostFavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

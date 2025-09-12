import { Test, TestingModule } from '@nestjs/testing';
import { PostLocalizationService } from './post-localization.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PostLocalizationService', () => {
  let service: PostLocalizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostLocalizationService, PrismaService],
    }).compile();

    service = module.get<PostLocalizationService>(PostLocalizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

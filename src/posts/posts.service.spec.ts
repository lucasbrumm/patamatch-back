import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

describe('PostsService', () => {
  let service: PostsService;
  let prismaService: PrismaService;

  const mockPost = {
    id: 1,
    title: 'Rex precisa de um lar',
    content: 'Rex é um cachorro muito amigável que precisa de um lar amoroso.',
    published: true,
    postType: 'adoption',
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: 1,
    dogId: 1,
    author: {
      id: 1,
      name: 'Maria Silva',
      email: 'maria@example.com',
    },
    dog: {
      id: 1,
      name: 'Rex',
      breed: 'Golden Retriever',
      age: 3,
      size: 'large',
      gender: 'male',
      isAdopted: false,
    },
  };

  const mockPrismaService = {
    post: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
    dog: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a post when found', async () => {
      mockPrismaService.post.findUnique.mockResolvedValue(mockPost);

      const result = await service.findOne(1);

      expect(result).toEqual(mockPost);
      expect(mockPrismaService.post.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          dog: {
            select: {
              id: true,
              name: true,
              breed: true,
              age: true,
              size: true,
              gender: true,
              isAdopted: true,
            },
          },
        },
      });
    });

    it('should throw NotFoundException when post not found', async () => {
      mockPrismaService.post.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a post successfully', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Novo post sobre adoção',
        content: 'Conteúdo do post',
        postType: 'adoption',
        authorId: 1,
        dogId: 1,
      };

      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 1,
        name: 'Maria',
      });
      mockPrismaService.dog.findUnique.mockResolvedValue({
        id: 1,
        name: 'Rex',
      });
      mockPrismaService.post.create.mockResolvedValue(mockPost);

      const result = await service.create(createPostDto);

      expect(result).toEqual(mockPost);
      expect(mockPrismaService.post.create).toHaveBeenCalledWith({
        data: createPostDto,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          dog: {
            select: {
              id: true,
              name: true,
              breed: true,
              age: true,
              size: true,
              gender: true,
              isAdopted: true,
            },
          },
        },
      });
    });

    it('should throw NotFoundException when author not found', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Novo post',
        content: 'Conteúdo',
        authorId: 999,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.create(createPostDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when dog not found', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Novo post',
        content: 'Conteúdo',
        authorId: 1,
        dogId: 999,
      };

      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 1,
        name: 'Maria',
      });
      mockPrismaService.dog.findUnique.mockResolvedValue(null);

      await expect(service.create(createPostDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a post successfully', async () => {
      const updatePostDto: UpdatePostDto = {
        title: 'Título atualizado',
      };

      mockPrismaService.post.update.mockResolvedValue(mockPost);

      const result = await service.update(1, updatePostDto);

      expect(result).toEqual(mockPost);
      expect(mockPrismaService.post.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updatePostDto,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          dog: {
            select: {
              id: true,
              name: true,
              breed: true,
              age: true,
              size: true,
              gender: true,
              isAdopted: true,
            },
          },
        },
      });
    });

    it('should throw NotFoundException when post not found', async () => {
      const updatePostDto: UpdatePostDto = {
        title: 'Título atualizado',
      };

      mockPrismaService.post.update.mockRejectedValue({
        code: 'P2025',
      });

      await expect(service.update(999, updatePostDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a post successfully', async () => {
      mockPrismaService.post.delete.mockResolvedValue(mockPost);

      const result = await service.remove(1);

      expect(result).toEqual(mockPost);
      expect(mockPrismaService.post.delete).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          dog: {
            select: {
              id: true,
              name: true,
              breed: true,
              age: true,
              size: true,
              gender: true,
              isAdopted: true,
            },
          },
        },
      });
    });

    it('should throw NotFoundException when post not found', async () => {
      mockPrismaService.post.delete.mockRejectedValue({
        code: 'P2025',
      });

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('publish', () => {
    it('should publish a post successfully', async () => {
      mockPrismaService.post.update.mockResolvedValue({
        ...mockPost,
        published: true,
      });

      const result = await service.publish(1);

      expect(result.published).toBe(true);
      expect(mockPrismaService.post.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { published: true },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          dog: {
            select: {
              id: true,
              name: true,
              breed: true,
              age: true,
              size: true,
              gender: true,
              isAdopted: true,
            },
          },
        },
      });
    });
  });

  describe('unpublish', () => {
    it('should unpublish a post successfully', async () => {
      mockPrismaService.post.update.mockResolvedValue({
        ...mockPost,
        published: false,
      });

      const result = await service.unpublish(1);

      expect(result.published).toBe(false);
      expect(mockPrismaService.post.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { published: false },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          dog: {
            select: {
              id: true,
              name: true,
              breed: true,
              age: true,
              size: true,
              gender: true,
              isAdopted: true,
            },
          },
        },
      });
    });
  });
});

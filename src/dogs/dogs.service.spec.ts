import { Test, TestingModule } from '@nestjs/testing';
import { DogsService } from './dogs.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

describe('DogsService', () => {
  let service: DogsService;

  const mockDog = {
    id: 1,
    name: 'Rex',
    breed: 'Golden Retriever',
    age: 3,
    size: 'large',
    gender: 'male',
    description: 'Friendly dog',
    isAdopted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    owner: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    },
  };

  const mockPrismaService = {
    dog: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DogsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<DogsService>(DogsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a dog when found', async () => {
      mockPrismaService.dog.findUnique.mockResolvedValue(mockDog);

      const result = await service.findOne(1);

      expect(result).toEqual(mockDog);
      expect(mockPrismaService.dog.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          localization: true,
        },
      });
    });

    it('should throw NotFoundException when dog not found', async () => {
      mockPrismaService.dog.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a dog successfully', async () => {
      const createDogDto: CreateDogDto = {
        name: 'Buddy',
        breed: 'Labrador',
        age: 2,
        size: 'medium',
        gender: 'female',
        description: 'Very playful',
        ownerId: 1,
      };

      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 1,
        name: 'John',
      });
      mockPrismaService.dog.create.mockResolvedValue(mockDog);

      const result = await service.create(createDogDto);

      expect(result).toEqual(mockDog);
      expect(mockPrismaService.dog.create).toHaveBeenCalledWith({
        data: createDogDto,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    });

    it('should throw NotFoundException when owner not found', async () => {
      const createDogDto: CreateDogDto = {
        name: 'Buddy',
        breed: 'Labrador',
        age: 2,
        size: 'medium',
        gender: 'female',
        ownerId: 999,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.create(createDogDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a dog successfully', async () => {
      const updateDogDto: UpdateDogDto = {
        name: 'Updated Rex',
      };

      mockPrismaService.dog.update.mockResolvedValue(mockDog);

      const result = await service.update(1, updateDogDto);

      expect(result).toEqual(mockDog);
      expect(mockPrismaService.dog.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDogDto,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    });

    it('should throw NotFoundException when dog not found', async () => {
      const updateDogDto: UpdateDogDto = {
        name: 'Updated Rex',
      };

      mockPrismaService.dog.update.mockRejectedValue({
        code: 'P2025',
      });

      await expect(service.update(999, updateDogDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a dog successfully', async () => {
      mockPrismaService.dog.delete.mockResolvedValue(mockDog);

      const result = await service.remove(1);

      expect(result).toEqual(mockDog);
      expect(mockPrismaService.dog.delete).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
    });

    it('should throw NotFoundException when dog not found', async () => {
      mockPrismaService.dog.delete.mockRejectedValue({
        code: 'P2025',
      });

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('adopt', () => {
    it('should adopt a dog successfully', async () => {
      const ownerId = 1;
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 1,
        name: 'John',
      });
      mockPrismaService.dog.findUnique.mockResolvedValue({
        ...mockDog,
        isAdopted: false,
      });
      mockPrismaService.dog.update.mockResolvedValue({
        ...mockDog,
        isAdopted: true,
        ownerId,
      });

      const result = await service.adopt(1, ownerId);

      expect(result.isAdopted).toBe(true);
      expect(result.ownerId).toBe(ownerId);
    });

    it('should throw NotFoundException when owner not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.adopt(1, 999)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when dog not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 1,
        name: 'John',
      });
      mockPrismaService.dog.findUnique.mockResolvedValue(null);

      await expect(service.adopt(999, 1)).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException when dog is already adopted', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 1,
        name: 'John',
      });
      mockPrismaService.dog.findUnique.mockResolvedValue({
        ...mockDog,
        isAdopted: true,
      });

      await expect(service.adopt(1, 1)).rejects.toThrow(ConflictException);
    });
  });
});

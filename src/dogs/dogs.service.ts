import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Dog } from '@prisma/client';

@Injectable()
export class DogsService {
  constructor(private prisma: PrismaService) {}

  async dog(
    dogWhereUniqueInput: Prisma.DogWhereUniqueInput,
  ): Promise<Dog | null> {
    return this.prisma.dog.findUnique({
      where: dogWhereUniqueInput,
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
  }

  async findAll(): Promise<Dog[]> {
    return this.prisma.dog.findMany({
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
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DogWhereUniqueInput;
    where?: Prisma.DogWhereInput;
    orderBy?: Prisma.DogOrderByWithRelationInput;
  }): Promise<Dog[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.dog.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
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
  }

  async findAvailable(): Promise<Dog[]> {
    return this.prisma.dog.findMany({
      where: {
        isAdopted: false,
      },
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
  }

  async findByOwner(ownerId: number): Promise<Dog[]> {
    return this.prisma.dog.findMany({
      where: {
        ownerId: ownerId,
      },
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
  }

  async create(createDogDto: CreateDogDto): Promise<Dog> {
    try {
      // Se ownerId foi fornecido, verificar se o usuário existe
      if (createDogDto.ownerId) {
        const owner = await this.prisma.user.findUnique({
          where: { id: createDogDto.ownerId },
        });
        if (!owner) {
          throw new NotFoundException(
            `User with ID ${createDogDto.ownerId} not found`,
          );
        }
      }

      return await this.prisma.dog.create({
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
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw error;
    }
  }

  async findOne(id: number): Promise<Dog> {
    const dog = await this.prisma.dog.findUnique({
      where: { id },
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

    if (!dog) {
      throw new NotFoundException(`Dog with ID ${id} not found`);
    }

    return dog;
  }

  async update(id: number, updateDogDto: UpdateDogDto): Promise<Dog> {
    try {
      // Se ownerId foi fornecido, verificar se o usuário existe
      if (updateDogDto.ownerId) {
        const owner = await this.prisma.user.findUnique({
          where: { id: updateDogDto.ownerId },
        });
        if (!owner) {
          throw new NotFoundException(
            `User with ID ${updateDogDto.ownerId} not found`,
          );
        }
      }

      return await this.prisma.dog.update({
        where: { id },
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
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error.code === 'P2025') {
        throw new NotFoundException(`Dog with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<Dog> {
    try {
      return await this.prisma.dog.delete({
        where: { id },
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
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Dog with ID ${id} not found`);
      }
      throw error;
    }
  }

  async adopt(id: number, ownerId: number): Promise<Dog> {
    try {
      // Verificar se o usuário existe
      const owner = await this.prisma.user.findUnique({
        where: { id: ownerId },
      });
      if (!owner) {
        throw new NotFoundException(`User with ID ${ownerId} not found`);
      }

      // Verificar se o cachorro existe e não está adotado
      const dog = await this.prisma.dog.findUnique({
        where: { id },
      });
      if (!dog) {
        throw new NotFoundException(`Dog with ID ${id} not found`);
      }
      if (dog.isAdopted) {
        throw new ConflictException(`Dog with ID ${id} is already adopted`);
      }

      return await this.prisma.dog.update({
        where: { id },
        data: {
          isAdopted: true,
          ownerId: ownerId,
        },
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
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw error;
    }
  }
}

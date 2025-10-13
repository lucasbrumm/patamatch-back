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
    const dogs = await this.prisma.dog.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: orderBy || { createdAt: 'desc' },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        images: {
          where: {
            order: 1,
          },
          select: {
            imageData: true,
            mimeType: true,
            filename: true,
          },
          take: 1,
        },
      },
    });

    // Transformar o array de imagens em um único objeto para cada dog
    return dogs.map((dog) => ({
      ...dog,
      image: dog.images.length > 0 ? dog.images[0] : null,
      images: undefined, // Remover o array de imagens
    }));
  }

  async findAvailablePaginated(
    page: number = 1,
    limit: number = 4,
    userId?: number,
  ): Promise<{
    content: any[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }> {
    const skip = (page - 1) * limit;

    const [dogs, total] = await Promise.all([
      this.prisma.dog.findMany({
        where: {
          isAvailable: true,
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          images: {
            where: {
              order: 1,
            },
            select: {
              imageData: true,
              mimeType: true,
              filename: true,
            },
            take: 1,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.dog.count({
        where: {
          isAvailable: true,
        },
      }),
    ]);

    let userFavorites: number[] = [];
    if (userId) {
      const favorites = await this.prisma.dogFavorite.findMany({
        where: {
          userId,
          isFavorite: true,
        },
        select: { dogId: true },
      });
      userFavorites = favorites.map((fav) => fav.dogId);
    }

    const transformedDogs = dogs.map((dog) => ({
      ...dog,
      isFavorite: userId ? userFavorites.includes(dog.id) : false,
      firstImage: dog.images[0] || null,
      images: undefined,
    }));

    const totalPages = Math.ceil(total / limit);

    return {
      content: transformedDogs,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async findByOwner(ownerId: number): Promise<Dog[]> {
    const dogs = await this.prisma.dog.findMany({
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
        images: {
          where: {
            order: 1,
          },
          select: {
            imageData: true,
            mimeType: true,
            filename: true,
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transformar o array de imagens em um único objeto para cada dog
    return dogs.map((dog) => ({
      ...dog,
      firstImage: dog.images.length > 0 ? dog.images[0] : null,
      images: undefined, // Remover o array de imagens
    }));
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
            phone: true,
          },
        },
        localization: true,
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

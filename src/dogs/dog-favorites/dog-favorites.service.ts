import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDogFavoriteDto } from './dto/create-dog-favorite.dto';
import { UpdateDogFavoriteDto } from './dto/update-dog-favorite.dto';

@Injectable()
export class DogFavoritesService {
  constructor(private prisma: PrismaService) {}

  async create(createDogFavoriteDto: CreateDogFavoriteDto): Promise<any> {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: createDogFavoriteDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verificar se o cachorro existe
    const dog = await this.prisma.dog.findUnique({
      where: { id: createDogFavoriteDto.dogId },
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    // Verificar se já existe o favorito
    const existingFavorite = await this.prisma.dogFavorite.findUnique({
      where: {
        userId_dogId: {
          userId: createDogFavoriteDto.userId,
          dogId: createDogFavoriteDto.dogId,
        },
      },
    });

    if (existingFavorite) {
      // Se já existe, atualizar o status de isFavorite
      return this.prisma.dogFavorite.update({
        where: {
          userId_dogId: {
            userId: createDogFavoriteDto.userId,
            dogId: createDogFavoriteDto.dogId,
          },
        },
        data: {
          isFavorite: createDogFavoriteDto.isFavorite ?? true,
        },
        include: {
          user: true,
          dog: {
            include: {
              images: true,
              owner: true,
              localization: true,
            },
          },
        },
      });
    }

    return this.prisma.dogFavorite.create({
      data: {
        ...createDogFavoriteDto,
        isFavorite: createDogFavoriteDto.isFavorite ?? true,
      },
      include: {
        user: true,
        dog: {
          include: {
            images: true,
            owner: true,
            localization: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.dogFavorite.findMany({
      include: {
        user: true,
        dog: {
          include: {
            images: true,
            owner: true,
            localization: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<any> {
    const favorite = await this.prisma.dogFavorite.findUnique({
      where: { id },
      include: {
        user: true,
        dog: {
          include: {
            images: true,
            owner: true,
            localization: true,
          },
        },
      },
    });

    if (!favorite) {
      throw new NotFoundException('DogFavorite not found');
    }

    return favorite;
  }

  async findByUserId(userId: number): Promise<any[]> {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.dogFavorite.findMany({
      where: { userId },
      include: {
        user: true,
        dog: {
          include: {
            images: true,
            owner: true,
            localization: true,
          },
        },
      },
    });
  }

  async findByDogId(dogId: number): Promise<any[]> {
    // Verificar se o cachorro existe
    const dog = await this.prisma.dog.findUnique({
      where: { id: dogId },
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    return this.prisma.dogFavorite.findMany({
      where: { dogId },
      include: {
        user: true,
        dog: {
          include: {
            images: true,
            owner: true,
            localization: true,
          },
        },
      },
    });
  }

  async findByUserAndDog(userId: number, dogId: number): Promise<any> {
    const favorite = await this.prisma.dogFavorite.findUnique({
      where: {
        userId_dogId: {
          userId,
          dogId,
        },
      },
      include: {
        user: true,
        dog: {
          include: {
            images: true,
            owner: true,
            localization: true,
          },
        },
      },
    });

    if (!favorite) {
      throw new NotFoundException('DogFavorite not found');
    }

    return favorite;
  }

  async update(
    id: number,
    updateDogFavoriteDto: UpdateDogFavoriteDto,
  ): Promise<any> {
    await this.findOne(id);

    return this.prisma.dogFavorite.update({
      where: { id },
      data: updateDogFavoriteDto,
      include: {
        user: true,
        dog: {
          include: {
            images: true,
            owner: true,
            localization: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<any> {
    await this.findOne(id);

    return this.prisma.dogFavorite.delete({
      where: { id },
    });
  }

  async removeByUserAndDog(userId: number, dogId: number): Promise<any> {
    const favorite = await this.prisma.dogFavorite.findUnique({
      where: {
        userId_dogId: {
          userId,
          dogId,
        },
      },
    });

    if (!favorite) {
      throw new NotFoundException('DogFavorite not found');
    }

    return this.prisma.dogFavorite.delete({
      where: {
        userId_dogId: {
          userId,
          dogId,
        },
      },
    });
  }

  async removeByUserId(userId: number): Promise<any> {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.dogFavorite.deleteMany({
      where: { userId },
    });
  }

  async removeByDogId(dogId: number): Promise<any> {
    // Verificar se o cachorro existe
    const dog = await this.prisma.dog.findUnique({
      where: { id: dogId },
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    return this.prisma.dogFavorite.deleteMany({
      where: { dogId },
    });
  }

  // Método para fazer toggle do status de favorito
  async toggleFavorite(userId: number, dogId: number): Promise<any> {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verificar se o cachorro existe
    const dog = await this.prisma.dog.findUnique({
      where: { id: dogId },
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    // Verificar se já existe o favorito
    const existingFavorite = await this.prisma.dogFavorite.findUnique({
      where: {
        userId_dogId: {
          userId,
          dogId,
        },
      },
    });

    if (existingFavorite) {
      // Se já existe, fazer toggle do status
      return this.prisma.dogFavorite.update({
        where: {
          userId_dogId: {
            userId,
            dogId,
          },
        },
        data: {
          isFavorite: !existingFavorite.isFavorite,
        },
        include: {
          user: true,
          dog: {
            include: {
              images: true,
              owner: true,
              localization: true,
            },
          },
        },
      });
    } else {
      // Se não existe, criar como favorito
      return this.prisma.dogFavorite.create({
        data: {
          userId,
          dogId,
          isFavorite: true,
        },
        include: {
          user: true,
          dog: {
            include: {
              images: true,
              owner: true,
              localization: true,
            },
          },
        },
      });
    }
  }

  // Método para buscar apenas favoritos ativos de um usuário
  async findActiveFavoritesByUserId(userId: number): Promise<any[]> {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.dogFavorite.findMany({
      where: {
        userId,
        isFavorite: true,
      },
      include: {
        user: true,
        dog: {
          include: {
            images: true,
            owner: true,
            localization: true,
          },
        },
      },
    });
  }

  // Método para buscar histórico completo de favoritos de um usuário (incluindo removidos)
  async findHistoryByUserId(userId: number): Promise<any[]> {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.dogFavorite.findMany({
      where: { userId },
      include: {
        user: true,
        dog: {
          include: {
            images: true,
            owner: true,
            localization: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }
}

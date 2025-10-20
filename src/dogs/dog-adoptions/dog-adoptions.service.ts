import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDogAdoptionDto } from './dto/create-dog-adoption.dto';
import { UpdateDogAdoptionDto } from './dto/update-dog-adoption.dto';

@Injectable()
export class DogAdoptionsService {
  constructor(private prisma: PrismaService) {}

  async create(createDogAdoptionDto: CreateDogAdoptionDto): Promise<any> {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: createDogAdoptionDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verificar se o cachorro existe
    const dog = await this.prisma.dog.findUnique({
      where: { id: createDogAdoptionDto.dogId },
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    // Verificar se já existe uma adoção ativa para este par usuário-cachorro
    const existingAdoption = await this.prisma.dogAdoption.findUnique({
      where: {
        userId_dogId: {
          userId: createDogAdoptionDto.userId,
          dogId: createDogAdoptionDto.dogId,
        },
      },
    });

    if (existingAdoption) {
      throw new ConflictException(
        'An adoption already exists for this user and dog',
      );
    }

    return this.prisma.dogAdoption.create({
      data: {
        ...createDogAdoptionDto,
        status: 'pending', // Sempre cria como pendente
      },
      include: {
        user: {
          include: {
            image: true,
          },
        },
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
    return this.prisma.dogAdoption.findMany({
      include: {
        user: {
          include: {
            image: true,
          },
        },
        dog: {
          include: {
            images: true,
            owner: true,
            localization: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number): Promise<any> {
    const adoption = await this.prisma.dogAdoption.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            image: true,
          },
        },
        dog: {
          include: {
            images: true,
            owner: true,
            localization: true,
          },
        },
      },
    });

    if (!adoption) {
      throw new NotFoundException('DogAdoption not found');
    }

    return adoption;
  }

  // Método para buscar adoções por usuário
  async findByUserId(userId: number): Promise<any[]> {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.dogAdoption.findMany({
      where: { userId },
      include: {
        user: {
          include: {
            image: true,
          },
        },
        dog: {
          include: {
            images: {
              take: 1,
              orderBy: {
                id: 'asc',
              },
            },
            owner: true,
            localization: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Método para buscar adoções por cachorro
  async findByDogId(dogId: number): Promise<any[]> {
    // Verificar se o cachorro existe
    const dog = await this.prisma.dog.findUnique({
      where: { id: dogId },
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    return this.prisma.dogAdoption.findMany({
      where: { dogId },
      include: {
        user: {
          include: {
            image: true,
          },
        },
        dog: {
          include: {
            images: true,
            owner: true,
            localization: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Método para buscar usuários que adotaram um cachorro específico
  async findUsersByDogId(dogId: number): Promise<any[]> {
    // Verificar se o cachorro existe
    const dog = await this.prisma.dog.findUnique({
      where: { id: dogId },
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    const adoptions = await this.prisma.dogAdoption.findMany({
      where: { dogId },
      include: {
        user: {
          include: {
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Retornar apenas os usuários com informações da adoção
    return adoptions.map((adoption) => ({
      ...adoption.user,
      adoptionId: adoption.id,
      adoptionStatus: adoption.status,
      adoptionNotes: adoption.notes,
      adoptionCreatedAt: adoption.createdAt,
      adoptionUpdatedAt: adoption.updatedAt,
    }));
  }

  // Método para buscar cachorros adotados por um usuário específico
  async findDogsByUserId(userId: number): Promise<any[]> {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const adoptions = await this.prisma.dogAdoption.findMany({
      where: { userId },
      include: {
        dog: {
          include: {
            images: true,
            owner: true,
            localization: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Retornar apenas os cachorros com informações da adoção
    return adoptions.map((adoption) => ({
      ...adoption.dog,
      adoptionId: adoption.id,
      adoptionStatus: adoption.status,
      adoptionNotes: adoption.notes,
      adoptionCreatedAt: adoption.createdAt,
      adoptionUpdatedAt: adoption.updatedAt,
    }));
  }

  // Método para buscar adoção específica por usuário e cachorro
  async findByUserAndDog(userId: number, dogId: number): Promise<any> {
    const adoption = await this.prisma.dogAdoption.findUnique({
      where: {
        userId_dogId: {
          userId,
          dogId,
        },
      },
      include: {
        user: {
          include: {
            image: true,
          },
        },
        dog: {
          include: {
            images: true,
            owner: true,
            localization: true,
          },
        },
      },
    });

    if (!adoption) {
      throw new NotFoundException('DogAdoption not found');
    }

    return adoption;
  }

  // Método para buscar adoções por status
  async findByStatus(status: string): Promise<any[]> {
    return this.prisma.dogAdoption.findMany({
      where: { status },
      include: {
        user: {
          include: {
            image: true,
          },
        },
        dog: {
          include: {
            images: true,
            owner: true,
            localization: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(
    id: number,
    updateDogAdoptionDto: UpdateDogAdoptionDto,
  ): Promise<any> {
    await this.findOne(id);

    return this.prisma.dogAdoption.update({
      where: { id },
      data: updateDogAdoptionDto,
      include: {
        user: {
          include: {
            image: true,
          },
        },
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

    return this.prisma.dogAdoption.delete({
      where: { id },
    });
  }

  async removeByUserAndDog(userId: number, dogId: number): Promise<any> {
    const adoption = await this.prisma.dogAdoption.findUnique({
      where: {
        userId_dogId: {
          userId,
          dogId,
        },
      },
    });

    if (!adoption) {
      throw new NotFoundException('DogAdoption not found');
    }

    return this.prisma.dogAdoption.delete({
      where: {
        userId_dogId: {
          userId,
          dogId,
        },
      },
    });
  }

  // Método para verificar se um usuário já se candidatou para adotar um cachorro
  async hasUserApplied(userId: number, dogId: number): Promise<boolean> {
    const adoption = await this.prisma.dogAdoption.findUnique({
      where: {
        userId_dogId: {
          userId,
          dogId,
        },
      },
    });

    return !!adoption; // Retorna true se existe, false se não existe
  }
}

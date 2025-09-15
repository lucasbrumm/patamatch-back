import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDogLocalizationDto } from './dto/create-dog-localization.dto';
import { UpdateDogLocalizationDto } from './dto/update-dog-localization.dto';

@Injectable()
export class DogLocalizationService {
  constructor(private prisma: PrismaService) {}

  async create(createDogLocalizationDto: CreateDogLocalizationDto): Promise<any> {
    // Verificar se o dog existe
    const dog = await this.prisma.dog.findUnique({
      where: { id: createDogLocalizationDto.dogId },
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    // Verificar se já existe localização para este dog
    const existingLocalization = await this.prisma.dogLocalization.findUnique({
      where: { dogId: createDogLocalizationDto.dogId },
    });

    if (existingLocalization) {
      throw new ConflictException('Dog already has a localization');
    }

    return this.prisma.dogLocalization.create({
      data: createDogLocalizationDto,
      include: {
        dog: {
          include: {
            images: true,
            owner: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.dogLocalization.findMany({
      include: {
        dog: {
          include: {
            images: true,
            owner: true,
          },
        },
      },
    });
  }

  async findOne(dogId: number): Promise<any> {
    const localization = await this.prisma.dogLocalization.findUnique({
      where: { dogId },
      include: {
        dog: {
          include: {
            images: true,
            owner: true,
          },
        },
      },
    });

    if (!localization) {
      throw new NotFoundException('DogLocalization not found');
    }

    return localization;
  }

  async update(dogId: number, updateDogLocalizationDto: UpdateDogLocalizationDto): Promise<any> {
    await this.findOne(dogId);

    return this.prisma.dogLocalization.update({
      where: { dogId },
      data: updateDogLocalizationDto,
      include: {
        dog: {
          include: {
            images: true,
            owner: true,
          },
        },
      },
    });
  }

  async remove(dogId: number): Promise<any> {
    await this.findOne(dogId);

    return this.prisma.dogLocalization.delete({
      where: { dogId },
    });
  }

  async findByRadius(latitude: number, longitude: number, radiusKm: number): Promise<any[]> {
    // Buscar localizações dentro do raio especificado
    // Esta é uma implementação simples - em produção, considere usar PostGIS para melhor performance
    const localizations = await this.prisma.dogLocalization.findMany({
      include: {
        dog: {
          include: {
            images: true,
            owner: true,
          },
        },
      },
    });

    // Filtrar por distância (implementação simples)
    return localizations.filter((loc) => {
      const distance = this.calculateDistance(
        latitude,
        longitude,
        loc.latitude,
        loc.longitude,
      );
      return distance <= radiusKm;
    });
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

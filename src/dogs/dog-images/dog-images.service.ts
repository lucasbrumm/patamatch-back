import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDogImageDto } from './dto/create-dog-image.dto';
import { UpdateDogImageDto } from './dto/update-dog-image.dto';

@Injectable()
export class DogImagesService {
  constructor(private prisma: PrismaService) {}

  async create(createDogImageDto: CreateDogImageDto): Promise<any> {
    // Verificar se o dog existe
    const dog = await this.prisma.dog.findUnique({
      where: { id: createDogImageDto.dogId },
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    return this.prisma.dogImage.create({
      data: createDogImageDto,
      include: {
        dog: true,
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.dogImage.findMany({
      include: {
        dog: true,
      },
    });
  }

  async findOne(id: number) {
    const dogImage = await this.prisma.dogImage.findUnique({
      where: { id },
      include: {
        dog: true,
      },
    });

    if (!dogImage) {
      throw new NotFoundException('DogImage not found');
    }

    return dogImage;
  }

  async findByDogId(dogId: number): Promise<any[]> {
    // Verificar se o dog existe
    const dog = await this.prisma.dog.findUnique({
      where: { id: dogId },
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    return this.prisma.dogImage.findMany({
      where: { dogId },
      include: {
        dog: true,
      },
    });
  }

  async update(id: number, updateDogImageDto: UpdateDogImageDto) {
    await this.findOne(id);

    return this.prisma.dogImage.update({
      where: { id },
      data: updateDogImageDto,
      include: {
        dog: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.dogImage.delete({
      where: { id },
    });
  }

  async removeByDogId(dogId: number) {
    // Verificar se o dog existe
    const dog = await this.prisma.dog.findUnique({
      where: { id: dogId },
    });

    if (!dog) {
      throw new NotFoundException('Dog not found');
    }

    return this.prisma.dogImage.deleteMany({
      where: { dogId },
    });
  }
}

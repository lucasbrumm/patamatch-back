import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserImageDto } from './dto/create-user-image.dto';
import { UpdateUserImageDto } from './dto/update-user-image.dto';

@Injectable()
export class UserImageService {
  constructor(private prisma: PrismaService) {}

  async create(createUserImageDto: CreateUserImageDto) {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: createUserImageDto.userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar se o usuário já tem uma imagem
    const existingImage = await this.prisma.userImage.findUnique({
      where: { userId: createUserImageDto.userId },
    });

    if (existingImage) {
      throw new ConflictException(
        'Usuário já possui uma imagem. Use PUT para atualizar.',
      );
    }

    return this.prisma.userImage.create({
      data: createUserImageDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.userImage.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const userImage = await this.prisma.userImage.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!userImage) {
      throw new NotFoundException('Imagem de usuário não encontrada');
    }

    return userImage;
  }

  async findByUserId(userId: number) {
    const userImage = await this.prisma.userImage.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!userImage) {
      throw new NotFoundException('Imagem de usuário não encontrada');
    }

    return userImage;
  }

  async update(id: number, updateUserImageDto: UpdateUserImageDto) {
    const userImage = await this.prisma.userImage.findUnique({
      where: { id },
    });

    if (!userImage) {
      throw new NotFoundException('Imagem de usuário não encontrada');
    }

    return this.prisma.userImage.update({
      where: { id },
      data: updateUserImageDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async updateByUserId(userId: number, updateUserImageDto: UpdateUserImageDto) {
    const userImage = await this.prisma.userImage.findUnique({
      where: { userId },
    });

    if (!userImage) {
      throw new NotFoundException('Imagem de usuário não encontrada');
    }

    return this.prisma.userImage.update({
      where: { userId },
      data: updateUserImageDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async upsert(
    userId: number,
    uploadData: {
      imageData: string;
      mimeType: string;
      filename?: string;
      size?: number;
    },
  ) {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.prisma.userImage.upsert({
      where: { userId },
      update: {
        imageData: uploadData.imageData,
        mimeType: uploadData.mimeType,
        filename: uploadData.filename,
        size: uploadData.size,
      },
      create: {
        userId,
        imageData: uploadData.imageData,
        mimeType: uploadData.mimeType,
        filename: uploadData.filename,
        size: uploadData.size,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    const userImage = await this.prisma.userImage.findUnique({
      where: { id },
    });

    if (!userImage) {
      throw new NotFoundException('Imagem de usuário não encontrada');
    }

    return this.prisma.userImage.delete({
      where: { id },
    });
  }

  async removeByUserId(userId: number) {
    const userImage = await this.prisma.userImage.findUnique({
      where: { userId },
    });

    if (!userImage) {
      throw new NotFoundException('Imagem de usuário não encontrada');
    }

    return this.prisma.userImage.delete({
      where: { userId },
    });
  }
}

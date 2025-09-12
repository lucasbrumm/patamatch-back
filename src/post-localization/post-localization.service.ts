import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostLocalizationDto } from './dto/create-post-localization.dto';
import { UpdatePostLocalizationDto } from './dto/update-post-localization.dto';

@Injectable()
export class PostLocalizationService {
  constructor(private prisma: PrismaService) {}

  async create(createPostLocalizationDto: CreatePostLocalizationDto) {
    // Verificar se o post existe
    const post = await this.prisma.post.findUnique({
      where: { id: createPostLocalizationDto.postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Verificar se já existe localização para este post
    const existingLocalization = await this.prisma.postLocalization.findUnique({
      where: { postId: createPostLocalizationDto.postId },
    });

    if (existingLocalization) {
      throw new Error('Post already has a localization');
    }

    return this.prisma.postLocalization.create({
      data: createPostLocalizationDto,
      include: {
        post: true,
      },
    });
  }

  async findAll() {
    return this.prisma.postLocalization.findMany({
      include: {
        post: true,
      },
    });
  }

  async findOne(postId: number) {
    const localization = await this.prisma.postLocalization.findUnique({
      where: { postId },
      include: {
        post: true,
      },
    });

    if (!localization) {
      throw new NotFoundException('PostLocalization not found');
    }

    return localization;
  }

  async findByPostId(postId: number) {
    return this.findOne(postId);
  }

  async update(
    postId: number,
    updatePostLocalizationDto: UpdatePostLocalizationDto,
  ) {
    const localization = await this.findOne(postId);

    return this.prisma.postLocalization.update({
      where: { postId },
      data: updatePostLocalizationDto,
      include: {
        post: true,
      },
    });
  }

  async remove(postId: number) {
    await this.findOne(postId);

    return this.prisma.postLocalization.delete({
      where: { postId },
    });
  }
}

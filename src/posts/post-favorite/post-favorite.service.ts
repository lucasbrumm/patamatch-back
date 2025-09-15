import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostFavoriteDto } from './dto/create-post-favorite.dto';
import { UpdatePostFavoriteDto } from './dto/update-post-favorite.dto';

@Injectable()
export class PostFavoritesService {
  constructor(private prisma: PrismaService) {}

  async create(createPostFavoriteDto: CreatePostFavoriteDto): Promise<any> {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: createPostFavoriteDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verificar se o post existe
    const post = await this.prisma.post.findUnique({
      where: { id: createPostFavoriteDto.postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Verificar se já existe o favorito
    const existingFavorite = await this.prisma.postFavorite.findUnique({
      where: {
        userId_postId: {
          userId: createPostFavoriteDto.userId,
          postId: createPostFavoriteDto.postId,
        },
      },
    });

    if (existingFavorite) {
      // Se já existe, atualizar o status de isFavorite
      return this.prisma.postFavorite.update({
        where: {
          userId_postId: {
            userId: createPostFavoriteDto.userId,
            postId: createPostFavoriteDto.postId,
          },
        },
        data: {
          isFavorite: createPostFavoriteDto.isFavorite ?? true,
        },
        include: {
          user: true,
          post: {
            include: {
              dog: {
                include: {
                  images: true,
                  owner: true,
                },
              },
              author: true,
            },
          },
        },
      });
    }

    return this.prisma.postFavorite.create({
      data: {
        ...createPostFavoriteDto,
        isFavorite: createPostFavoriteDto.isFavorite ?? true,
      },
      include: {
        user: true,
        post: {
          include: {
            dog: {
              include: {
                images: true,
                owner: true,
              },
            },
            author: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.postFavorite.findMany({
      include: {
        user: true,
        post: {
          include: {
            dog: {
              include: {
                images: true,
                owner: true,
              },
            },
            author: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<any> {
    const favorite = await this.prisma.postFavorite.findUnique({
      where: { id },
      include: {
        user: true,
        post: {
          include: {
            dog: {
              include: {
                images: true,
                owner: true,
              },
            },
            author: true,
          },
        },
      },
    });

    if (!favorite) {
      throw new NotFoundException('PostFavorite not found');
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

    return this.prisma.postFavorite.findMany({
      where: { userId },
      include: {
        user: true,
        post: {
          include: {
            dog: {
              include: {
                images: true,
                owner: true,
              },
            },
            author: true,
          },
        },
      },
    });
  }

  async findByPostId(postId: number): Promise<any[]> {
    // Verificar se o post existe
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.prisma.postFavorite.findMany({
      where: { postId },
      include: {
        user: true,
        post: {
          include: {
            dog: {
              include: {
                images: true,
                owner: true,
              },
            },
            author: true,
          },
        },
      },
    });
  }

  async findByUserAndPost(userId: number, postId: number): Promise<any> {
    const favorite = await this.prisma.postFavorite.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
      include: {
        user: true,
        post: {
          include: {
            dog: {
              include: {
                images: true,
                owner: true,
              },
            },
            author: true,
          },
        },
      },
    });

    if (!favorite) {
      throw new NotFoundException('PostFavorite not found');
    }

    return favorite;
  }

  async update(
    id: number,
    updatePostFavoriteDto: UpdatePostFavoriteDto,
  ): Promise<any> {
    await this.findOne(id);

    return this.prisma.postFavorite.update({
      where: { id },
      data: updatePostFavoriteDto,
      include: {
        user: true,
        post: {
          include: {
            dog: {
              include: {
                images: true,
                owner: true,
              },
            },
            author: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<any> {
    await this.findOne(id);

    return this.prisma.postFavorite.delete({
      where: { id },
    });
  }

  async removeByUserAndPost(userId: number, postId: number): Promise<any> {
    const favorite = await this.prisma.postFavorite.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (!favorite) {
      throw new NotFoundException('PostFavorite not found');
    }

    return this.prisma.postFavorite.delete({
      where: {
        userId_postId: {
          userId,
          postId,
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

    return this.prisma.postFavorite.deleteMany({
      where: { userId },
    });
  }

  async removeByPostId(postId: number): Promise<any> {
    // Verificar se o post existe
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.prisma.postFavorite.deleteMany({
      where: { postId },
    });
  }

  // Método para fazer toggle do status de favorito
  async toggleFavorite(userId: number, postId: number): Promise<any> {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verificar se o post existe
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Verificar se já existe o favorito
    const existingFavorite = await this.prisma.postFavorite.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingFavorite) {
      // Se já existe, fazer toggle do status
      return this.prisma.postFavorite.update({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
        data: {
          isFavorite: !existingFavorite.isFavorite,
        },
        include: {
          user: true,
          post: {
            include: {
              dog: {
                include: {
                  images: true,
                  owner: true,
                },
              },
              author: true,
            },
          },
        },
      });
    } else {
      // Se não existe, criar como favorito
      return this.prisma.postFavorite.create({
        data: {
          userId,
          postId,
          isFavorite: true,
        },
        include: {
          user: true,
          post: {
            include: {
              dog: {
                include: {
                  images: true,
                  owner: true,
                },
              },
              author: true,
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

    return this.prisma.postFavorite.findMany({
      where: {
        userId,
        isFavorite: true,
      },
      include: {
        user: true,
        post: {
          include: {
            dog: {
              include: {
                images: true,
                owner: true,
              },
            },
            author: true,
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

    return this.prisma.postFavorite.findMany({
      where: { userId },
      include: {
        user: true,
        post: {
          include: {
            dog: {
              include: {
                images: true,
                owner: true,
              },
            },
            author: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }
}

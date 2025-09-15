import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        dog: {
          select: {
            id: true,
            name: true,
            breed: true,
            age: true,
            size: true,
            gender: true,
            isAdopted: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        dog: {
          select: {
            id: true,
            name: true,
            breed: true,
            age: true,
            size: true,
            gender: true,
            isAdopted: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: orderBy || { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        dog: {
          select: {
            id: true,
            name: true,
            breed: true,
            age: true,
            size: true,
            gender: true,
            isAdopted: true,
          },
        },
      },
    });
  }

  async findPublished(
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

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where: {
          published: true,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          dog: {
            select: {
              id: true,
              name: true,
              breed: true,
              age: true,
              size: true,
              gender: true,
              isAdopted: true,
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
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.post.count({
        where: {
          published: true,
        },
      }),
    ]);

    let userFavorites: number[] = [];
    if (userId) {
      const favorites = await this.prisma.postFavorite.findMany({
        where: { userId },
        select: { postId: true },
      });
      userFavorites = favorites.map((fav) => fav.postId);
    }

    const transformedPosts = posts.map((post) => ({
      ...post,
      isFavorite: userId ? userFavorites.includes(post.id) : false,
      dog: {
        ...post.dog,
        firstImage: post.dog.images[0] || null,
        images: undefined,
      },
    }));

    const totalPages = Math.ceil(total / limit);

    return {
      content: transformedPosts,
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

  async findByAuthor(authorId: number): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        authorId: authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        dog: {
          select: {
            id: true,
            name: true,
            breed: true,
            age: true,
            size: true,
            gender: true,
            isAdopted: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByDog(dogId: number): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        dogId: dogId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        dog: {
          select: {
            id: true,
            name: true,
            breed: true,
            age: true,
            size: true,
            gender: true,
            isAdopted: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByType(postType: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        postType: postType,
        published: true,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        dog: {
          select: {
            id: true,
            name: true,
            breed: true,
            age: true,
            size: true,
            gender: true,
            isAdopted: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      // Se authorId foi fornecido, verificar se o usuário existe
      if (createPostDto.authorId) {
        const author = await this.prisma.user.findUnique({
          where: { id: createPostDto.authorId },
        });
        if (!author) {
          throw new NotFoundException(
            `User with ID ${createPostDto.authorId} not found`,
          );
        }
      }

      // Se dogId foi fornecido, verificar se o cachorro existe
      if (createPostDto.dogId) {
        const dog = await this.prisma.dog.findUnique({
          where: { id: createPostDto.dogId },
        });
        if (!dog) {
          throw new NotFoundException(
            `Dog with ID ${createPostDto.dogId} not found`,
          );
        }
      }

      return await this.prisma.post.create({
        data: createPostDto,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          dog: {
            select: {
              id: true,
              name: true,
              breed: true,
              age: true,
              size: true,
              gender: true,
              isAdopted: true,
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

  async findOne(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        dog: {
          select: {
            id: true,
            name: true,
            breed: true,
            age: true,
            size: true,
            gender: true,
            isAdopted: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      // Se authorId foi fornecido, verificar se o usuário existe
      if (updatePostDto.authorId) {
        const author = await this.prisma.user.findUnique({
          where: { id: updatePostDto.authorId },
        });
        if (!author) {
          throw new NotFoundException(
            `User with ID ${updatePostDto.authorId} not found`,
          );
        }
      }

      // Se dogId foi fornecido, verificar se o cachorro existe
      if (updatePostDto.dogId) {
        const dog = await this.prisma.dog.findUnique({
          where: { id: updatePostDto.dogId },
        });
        if (!dog) {
          throw new NotFoundException(
            `Dog with ID ${updatePostDto.dogId} not found`,
          );
        }
      }

      return await this.prisma.post.update({
        where: { id },
        data: updatePostDto,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          dog: {
            select: {
              id: true,
              name: true,
              breed: true,
              age: true,
              size: true,
              gender: true,
              isAdopted: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error.code === 'P2025') {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<Post> {
    try {
      return await this.prisma.post.delete({
        where: { id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          dog: {
            select: {
              id: true,
              name: true,
              breed: true,
              age: true,
              size: true,
              gender: true,
              isAdopted: true,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      throw error;
    }
  }

  async publish(id: number): Promise<Post> {
    try {
      return await this.prisma.post.update({
        where: { id },
        data: { published: true },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          dog: {
            select: {
              id: true,
              name: true,
              breed: true,
              age: true,
              size: true,
              gender: true,
              isAdopted: true,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      throw error;
    }
  }

  async unpublish(id: number): Promise<Post> {
    try {
      return await this.prisma.post.update({
        where: { id },
        data: { published: false },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          dog: {
            select: {
              id: true,
              name: true,
              breed: true,
              age: true,
              size: true,
              gender: true,
              isAdopted: true,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      throw error;
    }
  }
}

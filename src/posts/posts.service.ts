import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Post } from '../../generated/prisma';

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
            imageUrl: true,
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
            imageUrl: true,
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
            imageUrl: true,
          },
        },
      },
    });
  }

  async findPublished(): Promise<Post[]> {
    return this.prisma.post.findMany({
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
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
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
            imageUrl: true,
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
            imageUrl: true,
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
            imageUrl: true,
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
              imageUrl: true,
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
            imageUrl: true,
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
              imageUrl: true,
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
              imageUrl: true,
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
              imageUrl: true,
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
              imageUrl: true,
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

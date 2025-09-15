import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PostFavoritesModule } from './post-favorite/post-favorite.module';

@Module({
  imports: [PrismaModule, PostFavoritesModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService, PostFavoritesModule],
})
export class PostsModule {}

import { Module } from '@nestjs/common';
import { PostFavoritesService } from './post-favorite.service';
import { PostFavoritesController } from './post-favorite.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PostFavoritesController],
  providers: [PostFavoritesService],
  exports: [PostFavoritesService],
})
export class PostFavoritesModule {}

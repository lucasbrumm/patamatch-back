import { Module } from '@nestjs/common';
import { DogFavoritesService } from './dog-favorites.service';
import { DogFavoritesController } from './dog-favorites.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DogFavoritesController],
  providers: [DogFavoritesService],
  exports: [DogFavoritesService],
})
export class DogFavoritesModule {}

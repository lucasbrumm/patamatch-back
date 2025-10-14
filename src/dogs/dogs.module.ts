import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { DogImagesModule } from './dog-images/dog-images.module';
import { DogLocalizationModule } from './dog-localization/dog-localization.module';
import { DogFavoritesModule } from './dog-favorites/dog-favorites.module';
import { DogAdoptionsModule } from './dog-adoptions/dog-adoptions.module';

@Module({
  imports: [
    PrismaModule,
    DogImagesModule,
    DogLocalizationModule,
    DogFavoritesModule,
    DogAdoptionsModule,
  ],
  controllers: [DogsController],
  providers: [DogsService],
  exports: [
    DogsService,
    DogImagesModule,
    DogLocalizationModule,
    DogFavoritesModule,
    DogAdoptionsModule,
  ],
})
export class DogsModule {}

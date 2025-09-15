import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { DogImagesModule } from './dog-images/dog-images.module';
import { DogLocalizationModule } from './dog-localization/dog-localization.module';

@Module({
  imports: [PrismaModule, DogImagesModule, DogLocalizationModule],
  controllers: [DogsController],
  providers: [DogsService],
  exports: [DogsService, DogImagesModule, DogLocalizationModule],
})
export class DogsModule {}

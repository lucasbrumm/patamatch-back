import { Module } from '@nestjs/common';
import { DogImagesService } from './dog-images.service';
import { DogImagesController } from './dog-images.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DogImagesController],
  providers: [DogImagesService],
  exports: [DogImagesService],
})
export class DogImagesModule {}

import { Module } from '@nestjs/common';
import { DogAdoptionsService } from './dog-adoptions.service';
import { DogAdoptionsController } from './dog-adoptions.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DogAdoptionsController],
  providers: [DogAdoptionsService],
  exports: [DogAdoptionsService],
})
export class DogAdoptionsModule {}


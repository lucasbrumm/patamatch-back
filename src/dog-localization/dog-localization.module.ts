import { Module } from '@nestjs/common';
import { DogLocalizationService } from './dog-localization.service';
import { DogLocalizationController } from './dog-localization.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DogLocalizationController],
  providers: [DogLocalizationService],
  exports: [DogLocalizationService],
})
export class DogLocalizationModule {}

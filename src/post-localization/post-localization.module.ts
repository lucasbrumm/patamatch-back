import { Module } from '@nestjs/common';
import { PostLocalizationService } from './post-localization.service';
import { PostLocalizationController } from './post-localization.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PostLocalizationController],
  providers: [PostLocalizationService],
  exports: [PostLocalizationService],
})
export class PostLocalizationModule {}

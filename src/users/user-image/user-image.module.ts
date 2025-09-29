import { Module } from '@nestjs/common';
import { UserImageService } from './user-image.service';
import { UserImageController } from './user-image.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserImageController],
  providers: [UserImageService],
  exports: [UserImageService],
})
export class UserImageModule {}

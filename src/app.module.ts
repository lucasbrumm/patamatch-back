import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DogsModule } from './dogs/dogs.module';
import { UserImageModule } from './users/user-image/user-image.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UsersModule, DogsModule, UserImageModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

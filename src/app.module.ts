import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DogsModule } from './dogs/dogs.module';
import { PostsModule } from './posts/posts.module';
import { PostLocalizationModule } from './post-localization/post-localization.module';
import { DogImagesModule } from './dog-images/dog-images.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    UsersModule,
    DogsModule,
    PostsModule,
    PostLocalizationModule,
    DogImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

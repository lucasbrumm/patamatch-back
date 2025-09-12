import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DogsModule } from './dogs/dogs.module';
import { PostsModule } from './posts/posts.module';
import { DogLocalizationModule } from './dog-localization/dog-localization.module';
import { DogImagesModule } from './dog-images/dog-images.module';
import { DogFavoritesModule } from './dog-favorites/dog-favorites.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    UsersModule,
    DogsModule,
    PostsModule,
    DogLocalizationModule,
    DogImagesModule,
    DogFavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

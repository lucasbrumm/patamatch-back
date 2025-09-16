import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { DogFavoritesService } from './dog-favorites.service';
import { CreateDogFavoriteDto } from './dto/create-dog-favorite.dto';
import { UpdateDogFavoriteDto } from './dto/update-dog-favorite.dto';

@Controller('dog-favorites')
export class DogFavoritesController {
  constructor(private readonly dogFavoritesService: DogFavoritesService) {}

  @Post()
  create(@Body() createDogFavoriteDto: CreateDogFavoriteDto) {
    return this.dogFavoritesService.create(createDogFavoriteDto);
  }

  @Get()
  findAll() {
    return this.dogFavoritesService.findAll();
  }

  @Get('user/:userId')
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.dogFavoritesService.findByUserId(userId);
  }

  @Get('dog/:dogId')
  findByDogId(@Param('dogId', ParseIntPipe) dogId: number) {
    return this.dogFavoritesService.findByDogId(dogId);
  }

  @Get('user/:userId/dog/:dogId')
  findByUserAndDog(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('dogId', ParseIntPipe) dogId: number,
  ) {
    return this.dogFavoritesService.findByUserAndDog(userId, dogId);
  }

  @Get('user/:userId/active')
  findActiveFavoritesByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.dogFavoritesService.findActiveFavoritesByUserId(userId);
  }

  @Get('user/:userId/history')
  findHistoryByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.dogFavoritesService.findHistoryByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dogFavoritesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDogFavoriteDto: UpdateDogFavoriteDto,
  ) {
    return this.dogFavoritesService.update(id, updateDogFavoriteDto);
  }

  @Post('toggle')
  toggleFavorite(@Body() body: { userId: number; dogId: number }) {
    return this.dogFavoritesService.toggleFavorite(body.userId, body.dogId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dogFavoritesService.remove(id);
  }

  @Delete('user/:userId/dog/:dogId')
  removeByUserAndDog(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('dogId', ParseIntPipe) dogId: number,
  ) {
    return this.dogFavoritesService.removeByUserAndDog(userId, dogId);
  }

  @Delete('user/:userId')
  removeByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.dogFavoritesService.removeByUserId(userId);
  }

  @Delete('dog/:dogId')
  removeByDogId(@Param('dogId', ParseIntPipe) dogId: number) {
    return this.dogFavoritesService.removeByDogId(dogId);
  }
}

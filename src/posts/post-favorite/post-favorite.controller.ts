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
import { PostFavoritesService } from './post-favorite.service';
import { CreatePostFavoriteDto } from './dto/create-post-favorite.dto';
import { UpdatePostFavoriteDto } from './dto/update-post-favorite.dto';

@Controller('post-favorites')
export class PostFavoritesController {
  constructor(private readonly postFavoritesService: PostFavoritesService) {}

  @Post()
  create(@Body() createPostFavoriteDto: CreatePostFavoriteDto) {
    return this.postFavoritesService.create(createPostFavoriteDto);
  }

  @Get()
  findAll() {
    return this.postFavoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postFavoritesService.findOne(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.postFavoritesService.findByUserId(userId);
  }

  @Get('post/:postId')
  findByPostId(@Param('postId', ParseIntPipe) postId: number) {
    return this.postFavoritesService.findByPostId(postId);
  }

  @Get('user/:userId/post/:postId')
  findByUserAndPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.postFavoritesService.findByUserAndPost(userId, postId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostFavoriteDto: UpdatePostFavoriteDto,
  ) {
    return this.postFavoritesService.update(id, updatePostFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postFavoritesService.remove(id);
  }

  @Delete('user/:userId/post/:postId')
  removeByUserAndPost(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.postFavoritesService.removeByUserAndPost(userId, postId);
  }

  @Delete('user/:userId')
  removeByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.postFavoritesService.removeByUserId(userId);
  }

  @Delete('post/:postId')
  removeByPostId(@Param('postId', ParseIntPipe) postId: number) {
    return this.postFavoritesService.removeByPostId(postId);
  }
}

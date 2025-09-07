import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('/findMany')
  findMany(@Query() query: any) {
    return this.postsService.findMany(query);
  }

  @Get('/published')
  findPublished() {
    return this.postsService.findPublished();
  }

  @Get('/type/:postType')
  findByType(@Param('postType') postType: string) {
    return this.postsService.findByType(postType);
  }

  @Get('/author/:authorId')
  findByAuthor(@Param('authorId') authorId: string) {
    return this.postsService.findByAuthor(+authorId);
  }

  @Get('/dog/:dogId')
  findByDog(@Param('dogId') dogId: string) {
    return this.postsService.findByDog(+dogId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Patch(':id/publish')
  publish(@Param('id') id: string) {
    return this.postsService.publish(+id);
  }

  @Patch(':id/unpublish')
  unpublish(@Param('id') id: string) {
    return this.postsService.unpublish(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}

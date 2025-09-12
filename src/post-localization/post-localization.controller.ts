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
import { PostLocalizationService } from './post-localization.service';
import { CreatePostLocalizationDto } from './dto/create-post-localization.dto';
import { UpdatePostLocalizationDto } from './dto/update-post-localization.dto';

@Controller('post-localization')
export class PostLocalizationController {
  constructor(
    private readonly postLocalizationService: PostLocalizationService,
  ) {}

  @Post()
  create(@Body() createPostLocalizationDto: CreatePostLocalizationDto) {
    return this.postLocalizationService.create(createPostLocalizationDto);
  }

  @Get()
  findAll() {
    return this.postLocalizationService.findAll();
  }

  @Get(':postId')
  findOne(@Param('postId', ParseIntPipe) postId: number) {
    return this.postLocalizationService.findOne(postId);
  }

  @Get('post/:postId')
  findByPostId(@Param('postId', ParseIntPipe) postId: number) {
    return this.postLocalizationService.findByPostId(postId);
  }

  @Patch(':postId')
  update(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() updatePostLocalizationDto: UpdatePostLocalizationDto,
  ) {
    return this.postLocalizationService.update(
      postId,
      updatePostLocalizationDto,
    );
  }

  @Delete(':postId')
  remove(@Param('postId', ParseIntPipe) postId: number) {
    return this.postLocalizationService.remove(postId);
  }
}

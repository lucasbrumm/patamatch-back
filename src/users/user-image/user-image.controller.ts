import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserImageService } from './user-image.service';
import { CreateUserImageDto } from './dto/create-user-image.dto';
import { UpdateUserImageDto } from './dto/update-user-image.dto';
import { UserImageUploadInterceptor } from './interceptors/user-image-upload.interceptor';

@Controller('user-images')
export class UserImageController {
  constructor(private readonly userImageService: UserImageService) {}

  @Post()
  @UseInterceptors(UserImageUploadInterceptor)
  create(@Body() createUserImageDto: CreateUserImageDto) {
    return this.userImageService.create(createUserImageDto);
  }

  @Get()
  @UseInterceptors(UserImageUploadInterceptor)
  findAll() {
    return this.userImageService.findAll();
  }

  @Get(':id')
  @UseInterceptors(UserImageUploadInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userImageService.findOne(id);
  }

  @Get(':id/full')
  findOneWithData(@Param('id', ParseIntPipe) id: number) {
    return this.userImageService.findOne(id);
  }

  @Get('user/:userId')
  @UseInterceptors(UserImageUploadInterceptor)
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.userImageService.findByUserId(userId);
  }

  @Get('user/:userId/full')
  findByUserIdWithData(@Param('userId', ParseIntPipe) userId: number) {
    return this.userImageService.findByUserId(userId);
  }

  @Patch(':id')
  @UseInterceptors(UserImageUploadInterceptor)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserImageDto: UpdateUserImageDto,
  ) {
    return this.userImageService.update(id, updateUserImageDto);
  }

  @Patch('user/:userId')
  @UseInterceptors(UserImageUploadInterceptor)
  updateByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserImageDto: UpdateUserImageDto,
  ) {
    return this.userImageService.updateByUserId(userId, updateUserImageDto);
  }

  @Post('upload/:userId')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'), UserImageUploadInterceptor)
  async uploadImage(
    @Param('userId', ParseIntPipe) userId: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const base64Data = file.buffer.toString('base64');
    const dataUrl = `data:${file.mimetype};base64,${base64Data}`;

    return this.userImageService.upsert(userId, {
      imageData: dataUrl,
      mimeType: file.mimetype,
      filename: file.originalname,
      size: file.size,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userImageService.remove(id);
  }

  @Delete('user/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.userImageService.removeByUserId(userId);
  }
}

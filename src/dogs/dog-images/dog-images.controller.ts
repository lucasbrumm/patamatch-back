import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { DogImagesService } from './dog-images.service';
import { CreateDogImageDto } from './dto/create-dog-image.dto';
import { UpdateDogImageDto } from './dto/update-dog-image.dto';
import { ImageUploadInterceptor } from './interceptors/image-upload.interceptor';

@Controller('dog-images')
export class DogImagesController {
  constructor(private readonly dogImagesService: DogImagesService) {}

  @Get('count/:dogId')
  count(@Param('dogId', ParseIntPipe) dogId: number) {
    return this.dogImagesService.countDogImagesByDogId(dogId);
  }

  @Post()
  create(@Body() createDogImageDto: CreateDogImageDto) {
    return this.dogImagesService.create(createDogImageDto);
  }

  @Post('upload/:dogId')
  @UseInterceptors(FileInterceptor('image'), ImageUploadInterceptor)
  async uploadImage(
    @Param('dogId', ParseIntPipe) dogId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5_000_000 })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<any> {
    const base64Data = file.buffer.toString('base64');
    const dataUrl = `data:${file.mimetype};base64,${base64Data}`;

    const createDogImageDto: CreateDogImageDto = {
      imageData: dataUrl,
      mimeType: file.mimetype,
      filename: file.originalname,
      size: file.size,
      dogId,
    };

    return this.dogImagesService.create(createDogImageDto);
  }

  @Post('upload-multiple/:dogId')
  @UseInterceptors(FilesInterceptor('images', 10), ImageUploadInterceptor)
  async uploadMultipleImages(
    @Param('dogId', ParseIntPipe) dogId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<{ message: string; images: any[] }> {
    console.log('uploadMultipleImages');
    const results: any[] = [];

    for (const file of files) {
      // Converter buffer para base64
      const base64Data = file.buffer.toString('base64');
      const dataUrl = `data:${file.mimetype};base64,${base64Data}`;

      const createDogImageDto: CreateDogImageDto = {
        imageData: dataUrl,
        mimeType: file.mimetype,
        filename: file.originalname,
        size: file.size,
        dogId,
      };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result: any = await this.dogImagesService.create(createDogImageDto);
      results.push(result);
    }

    return {
      message: `${results.length} images uploaded successfully`,
      images: results,
    };
  }

  @Get()
  findAll() {
    console.log('findAll');
    return this.dogImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dogImagesService.findOne(id);
  }

  @Get('dog/:dogId')
  findByDogId(@Param('dogId', ParseIntPipe) dogId: number) {
    return this.dogImagesService.findByDogId(dogId);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'), ImageUploadInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateDogImageDto: UpdateDogImageDto,
  ): Promise<any> {
    if (file) {
      const base64Data = file.buffer.toString('base64');
      const dataUrl = `data:${file.mimetype};base64,${base64Data}`;

      const updatedDto: UpdateDogImageDto = {
        ...updateDogImageDto,
        imageData: dataUrl,
        mimeType: file.mimetype,
        filename: file.originalname,
        size: file.size,
      };

      return this.dogImagesService.update(id, updatedDto);
    }

    return this.dogImagesService.update(id, updateDogImageDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dogImagesService.remove(id);
  }

  @Delete('dog/:dogId')
  removeByDogId(@Param('dogId', ParseIntPipe) dogId: number) {
    return this.dogImagesService.removeByDogId(dogId);
  }
}

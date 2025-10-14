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
import { DogAdoptionsService } from './dog-adoptions.service';
import { CreateDogAdoptionDto } from './dto/create-dog-adoption.dto';
import { UpdateDogAdoptionDto } from './dto/update-dog-adoption.dto';

@Controller('dog-adoptions')
export class DogAdoptionsController {
  constructor(private readonly dogAdoptionsService: DogAdoptionsService) {}

  @Post()
  create(@Body() createDogAdoptionDto: CreateDogAdoptionDto) {
    return this.dogAdoptionsService.create(createDogAdoptionDto);
  }

  @Get()
  findAll() {
    return this.dogAdoptionsService.findAll();
  }

  @Get('user/:userId')
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.dogAdoptionsService.findByUserId(userId);
  }

  @Get('dog/:dogId')
  findByDogId(@Param('dogId', ParseIntPipe) dogId: number) {
    return this.dogAdoptionsService.findByDogId(dogId);
  }

  @Get('users-by-dog/:dogId')
  findUsersByDogId(@Param('dogId', ParseIntPipe) dogId: number) {
    return this.dogAdoptionsService.findUsersByDogId(dogId);
  }

  @Get('dogs-by-user/:userId')
  findDogsByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.dogAdoptionsService.findDogsByUserId(userId);
  }

  @Get('user/:userId/dog/:dogId')
  findByUserAndDog(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('dogId', ParseIntPipe) dogId: number,
  ) {
    return this.dogAdoptionsService.findByUserAndDog(userId, dogId);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.dogAdoptionsService.findByStatus(status);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dogAdoptionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDogAdoptionDto: UpdateDogAdoptionDto,
  ) {
    return this.dogAdoptionsService.update(id, updateDogAdoptionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dogAdoptionsService.remove(id);
  }

  @Delete('user/:userId/dog/:dogId')
  removeByUserAndDog(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('dogId', ParseIntPipe) dogId: number,
  ) {
    return this.dogAdoptionsService.removeByUserAndDog(userId, dogId);
  }
}


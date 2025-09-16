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
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogsService.create(createDogDto);
  }

  @Get()
  findAll() {
    return this.dogsService.findAll();
  }

  @Get('/findMany')
  findMany(@Query() query: any) {
    return this.dogsService.findMany(query);
  }

  @Get('/available')
  findAvailablePaginated(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('userId') userId?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 4;
    const userIdNum = userId ? parseInt(userId, 10) : undefined;

    return this.dogsService.findAvailablePaginated(
      pageNum,
      limitNum,
      userIdNum,
    );
  }

  @Get('/owner/:ownerId')
  findByOwner(@Param('ownerId') ownerId: string) {
    return this.dogsService.findByOwner(+ownerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return this.dogsService.update(+id, updateDogDto);
  }

  @Patch(':id/adopt')
  adopt(@Param('id') id: string, @Body() body: { ownerId: number }) {
    return this.dogsService.adopt(+id, body.ownerId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dogsService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { DogLocalizationService } from './dog-localization.service';
import { CreateDogLocalizationDto } from './dto/create-dog-localization.dto';
import { UpdateDogLocalizationDto } from './dto/update-dog-localization.dto';

@Controller('dog-localization')
export class DogLocalizationController {
  constructor(
    private readonly dogLocalizationService: DogLocalizationService,
  ) {}

  @Post()
  create(@Body() createDogLocalizationDto: CreateDogLocalizationDto) {
    console.log(createDogLocalizationDto);
    return this.dogLocalizationService.create(createDogLocalizationDto);
  }

  @Get()
  findAll() {
    return this.dogLocalizationService.findAll();
  }

  @Get('search')
  findByRadius(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
    @Query('radius') radius: string,
  ) {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const radiusKm = parseFloat(radius);

    if (isNaN(lat) || isNaN(lon) || isNaN(radiusKm)) {
      throw new Error('Invalid latitude, longitude, or radius parameters');
    }

    return this.dogLocalizationService.findByRadius(lat, lon, radiusKm);
  }

  @Get(':dogId')
  findOne(@Param('dogId', ParseIntPipe) dogId: number) {
    return this.dogLocalizationService.findOne(dogId);
  }

  @Patch(':dogId')
  update(
    @Param('dogId', ParseIntPipe) dogId: number,
    @Body() updateDogLocalizationDto: UpdateDogLocalizationDto,
  ) {
    return this.dogLocalizationService.update(dogId, updateDogLocalizationDto);
  }

  @Delete(':dogId')
  remove(@Param('dogId', ParseIntPipe) dogId: number) {
    return this.dogLocalizationService.remove(dogId);
  }
}

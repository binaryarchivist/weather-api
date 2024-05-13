import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';

import { WeatherService } from './weather.service';

import { CreateWeatherDto } from './dto/create-weather.dto';
import { Permissions, RolesPermissionsGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { GetWeatherDto } from './dto/get-weather.dto';

@UseGuards(JwtAuthGuard, RolesPermissionsGuard)
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {
  }

  @Permissions('WRITE')
  @Post()
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.create(createWeatherDto);
  }

  @Permissions('READ')
  @Get()
  findAll(
    @Query('cursor') cursor?: string,
    @Query('limit') limit = 5,
  ): Promise<GetWeatherDto> {
    return this.weatherService.findAll({ cursor, limit });
  }
}

import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { Permissions, RolesPermissionsGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { GetWeatherDto } from './dto/get-weather.dto';

@UseGuards(JwtAuthGuard, RolesPermissionsGuard)
@ApiTags('weather')
@ApiBearerAuth()
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Permissions('WRITE')
  @Post()
  @ApiOperation({ summary: 'Create weather data' })
  @ApiResponse({ status: 201, description: 'The weather data has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.create(createWeatherDto);
  }

  @Permissions('READ')
  @Get()
  @ApiOperation({ summary: 'Get all weather data' })
  @ApiResponse({ status: 200, description: 'Weather data retrieved successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiQuery({ name: 'cursor', required: false, type: String, description: 'Cursor for pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit for pagination' })
  findAll(
    @Query('cursor') cursor?: string,
    @Query('limit') limit = 5,
  ): Promise<GetWeatherDto> {
    return this.weatherService.findAll({ cursor, limit });
  }
}

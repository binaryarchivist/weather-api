import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Weather, WeatherDocument } from '../entities/weather.entity';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<WeatherDocument>
  ) {}

  async create(createWeatherDto: any): Promise<Weather> {
    const createdWeather = new this.weatherModel(createWeatherDto);
    return createdWeather.save();
  }

  async findAll(): Promise<Weather[]> {
    return this.weatherModel.find().exec();
  }

  async findOne(id: string): Promise<Weather> {
    return this.weatherModel.findById(id).exec();
  }

  async update(id: string, updateWeatherDto: any): Promise<Weather> {
    return this.weatherModel
      .findByIdAndUpdate(id, updateWeatherDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.weatherModel.findByIdAndDelete(id).exec();
  }
}

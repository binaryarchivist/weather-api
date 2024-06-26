import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { Weather, WeatherDocument } from '../entities/weather.entity';
import { GetWeatherDto } from './dto/get-weather.dto';

interface Pagination {
  cursor?: string;
  limit: number;
}

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<WeatherDocument>,
  ) {
  }

  async create(createWeatherDto: any): Promise<Weather> {
    const createdWeather = new this.weatherModel(createWeatherDto);
    return createdWeather.save();
  }

  async findAll(params: Pagination): Promise<GetWeatherDto> {
    const { cursor, limit = 5 } = params;

    const query = cursor
      ? { _id: { $gte: new Types.ObjectId(cursor) } }
      : {};

    const data = await this.weatherModel
      .find(query)
      .limit(Number(limit) + 1)
      .exec();

    let nextCursor: string | undefined;
    if (data.length > limit) {
      nextCursor = data[data.length - 1]._id.toHexString();
      data.pop();
    }

    return { data, nextCursor };
  }
}

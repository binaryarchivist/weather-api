import { Weather } from '../../entities/weather.entity';

export interface GetWeatherDto {
  data: Weather[];
  nextCursor?: string;
}
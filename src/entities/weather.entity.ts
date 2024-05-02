import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherDocument = Weather & Document;

@Schema()
export class Weather {
  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  city: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);

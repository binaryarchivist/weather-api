import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { WeatherModule } from './weather/weather.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/guards/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    PassportModule,
    WeatherModule,
    AuthModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}

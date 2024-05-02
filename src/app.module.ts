import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './auth/jwt.strategy';
import { WeatherModule } from './weather/weather.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret:c:o:c:k',
      signOptions: { expiresIn: '60s' },
    }),
    WeatherModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}

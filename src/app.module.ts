import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './core/http/response-interceptor';
import { DriversModule } from './drivers/drivers.module';
import { JourneysModule } from './journeys/journeys.module';
import { PassengersModule } from './passengers/passengers.module';

@Module({
  imports: [DriversModule, PassengersModule, JourneysModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}

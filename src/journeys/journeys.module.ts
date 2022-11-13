import { Module } from '@nestjs/common';
import { PassengersModule } from 'src/passengers/passengers.module';
import { JourneysController } from './journeys.controller';
import { JourneysService } from './journeys.service';

@Module({
  imports: [PassengersModule],
  controllers: [JourneysController],
  providers: [JourneysService],
})
export class JourneysModule {}

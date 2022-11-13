import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { NestResponse } from 'src/core/http/response';
import { NestResponseBuilder } from 'src/core/http/response-builder';
import { Journey } from './journeys.entity';
import { JourneysService } from './journeys.service';

@Controller('journeys')
export class JourneysController {
  constructor(private journeyService: JourneysService) {}

  @Post()
  public createdJourneyOrder(@Body() journey: Journey): NestResponse {
    const journeyCreated =
      this.journeyService.createJourneyOrderService(journey);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        Location: `/journeys`,
      })
      .withBody(journeyCreated)
      .build();
  }

  @Get('/close')
  public closeJourneysDriver(@Body() body): NestResponse {
    const closeJourneys = this.journeyService.closeJourneysService(body);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/journeys/close`,
      })
      .withBody(closeJourneys)
      .build();
  }
}

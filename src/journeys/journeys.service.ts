import { Injectable, NotFoundException } from '@nestjs/common';
import { PassengersService } from 'src/passengers/passengers.service';
import { Journey, Status } from './journeys.entity';

@Injectable()
export class JourneysService {
  private journeys: Array<Journey> = [];

  constructor(private passenger2: PassengersService) {}

  public createJourneyOrderService(journey: Journey): Journey {
    const validId = this.passenger2.getPassengersService();
    const validId2 = validId.find((item) => item.cpf == journey.passengerCpfId);
    if (!validId2) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Passenger ID(CPF) not found',
      });
    }
    journey.status = Status.CREATED;
    this.journeys.push(journey);
    return journey;
  }

  public closeJourneysService(body): Journey[] {
    body.startAddress = {
      state: 'Santa Catarina',
      city: 'Florianópolis',
      district: 'Centro',
    };

    const close = this.journeys.filter(
      (item) =>
        item.startAddress.state.toLowerCase() ==
          body.startAddress.state.toLowerCase() &&
        item.startAddress.city.toLowerCase() ==
          body.startAddress.city.toLowerCase() &&
        item.startAddress.district.toLowerCase() ==
          body.startAddress.district.toLowerCase(),
    );

    if (close.length < 1) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'No passengers near you',
      });
    }
    return close;
  }
}

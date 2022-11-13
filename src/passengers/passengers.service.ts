import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Passenger } from './passengers.entity';

@Injectable()
export class PassengersService {
  private passengers: Array<Passenger> = [];

  public createPassengersService(passenger: Passenger): Passenger {
    const passengerCpfExists = this.passengers.find(
      (item) => item.cpf == passenger.cpf,
    );
    if (passengerCpfExists) {
      throw new ConflictException({
        statusCode: 409,
        message: 'CPF already registered',
      });
    }

    passenger.jorneyRegister = 0;
    this.passengers.push(passenger);
    return passenger;
  } // usei em criar

  public paginate(page: number, limit: number, nameStart: string) {
    const indexI = page * limit;
    const indexF = indexI + limit;
    const passengers = this.passengers;

    if (nameStart) {
      return this.passengers.filter((name) =>
        name.name.toLowerCase().startsWith(nameStart.toLowerCase()),
      );
    }

    if (page < 0) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Initial page is 0. Page must be 0 or a positive number',
      });
    }

    if (passengers.length > indexI) {
      if (passengers.length > indexF) {
        return passengers.slice(indexI, indexF);
      } else {
        return passengers.slice(indexI, passengers.length);
      }
    } else {
      return [];
    }
  } // usei em listar passageiros

  public searchPassengerByCpf(cpf: string): Passenger {
    const passenger = this.passengers.find((passenger) => passenger.cpf == cpf);
    if (!passenger) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Passenger not found',
      });
    }
    return passenger;
  } // usei em detalhar passageiro por cpf

  public updatePassengerService(cpf: string, body: Passenger): Passenger {
    const passengerUp = this.passengers.find(
      (passenger) => passenger.cpf == cpf,
    );
    if (!passengerUp) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Passenger not found',
      });
    }

    const passengerUp2 = this.passengers.find((item) => item.cpf == body.cpf);

    if (passengerUp2 && passengerUp.cpf != passengerUp2.cpf) {
      throw new ConflictException({
        statusCode: 409,
        message: 'CPF already registered',
      });
    }

    this.passengers.forEach((passenger) => {
      if (passenger.cpf == cpf) {
        passenger.name = body.name;
        passenger.birthDate = body.birthDate;
        passenger.cpf = body.cpf;
        passenger.address = body.address;
      }
    });

    return body;
  } // usei para atualizar passageiro

  public deletePassengerService(cpf: string): Passenger {
    const passenger = this.passengers.find((passenger) => passenger.cpf == cpf);
    if (!passenger) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Passenger not found',
      });
    }
    if (passenger.jorneyRegister > 0) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Passenger cannot be deleted',
      });
    }
    const newList = this.passengers.filter((passenger) => passenger.cpf != cpf);
    this.passengers = [...newList];
    return passenger;
  } // usei para deletar

  public getPassengersService(): Passenger[] {
    return this.passengers;
  } // usar em journeys

  public cpfExists(cpf: string) {
    const driver = this.passengers.find((driver) => driver.cpf == cpf);
    return driver;
  } // usei na validator cpf
}

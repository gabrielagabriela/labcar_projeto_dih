import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/response';
import { NestResponseBuilder } from 'src/core/http/response-builder';
import { Passenger } from './passengers.entity';
import { PassengersService } from './passengers.service';

@Controller('passengers')
export class PassengersController {
  constructor(private passengerService: PassengersService) {}

  @Post() // criar passageiro
  public createPassenger(@Body() passenger: Passenger): NestResponse {
    const passengerCreated =
      this.passengerService.createPassengersService(passenger);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        Location: `/passengers/cpf/${passengerCreated.cpf}`,
      })
      .withBody(passengerCreated)
      .build();
  }

  @Get() // listar passageiros por pagina/nome
  public getPassenger(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page = 0,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit = 100,
    @Query('name') nameStartsWith: string,
  ): NestResponse {
    const passengers = this.passengerService.paginate(
      page,
      limit,
      nameStartsWith,
    );
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/passengers?page=${page}&limit=${limit}&name=${nameStartsWith}`,
      })
      .withBody(passengers)
      .build();
  }

  @Get('/cpf/:cpf') // detalhar passageiro por cpf
  public getPassengerByCpf(@Param('cpf') cpf: string): NestResponse {
    const passenger = this.passengerService.searchPassengerByCpf(cpf);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/passengers/cpf/${passenger.cpf}`,
      })
      .withBody(passenger)
      .build();
  }

  @Put('/update/:cpf') // atualizar dados passageiro
  public updateDriver(
    @Param('cpf') cpf: string,
    @Body() body: Passenger,
  ): NestResponse {
    const passengerUp = this.passengerService.updatePassengerService(cpf, body);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/passengers/update/${cpf}`,
      })
      .withBody(passengerUp)
      .build();
  }

  @Delete('/delete/:cpf') // deletar passageiro
  public deletePassenger(@Param('cpf') cpf: string): NestResponse {
    const passenger = this.passengerService.deletePassengerService(cpf);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/passengers/delete/${cpf}`,
      })
      .withBody(passenger)
      .build();
  }
}

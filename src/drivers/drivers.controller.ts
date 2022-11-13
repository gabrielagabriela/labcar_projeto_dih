import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/response';
import { NestResponseBuilder } from 'src/core/http/response-builder';
import { Driver } from './drivers.entity';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private driverService: DriversService) {}

  @Post() //criar motoristas
  public createDriver(@Body() driver: Driver): NestResponse {
    const driverCreated = this.driverService.createDriverService(driver);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        Location: `/drivers/cpf/${driverCreated.cpf}`,
      })
      .withBody(driverCreated)
      .build();
  }

  @Get() //listar motoristas por pagina
  public getDrivers(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page = 0,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit = 100,
    @Query('name') nameStartsWith: string,
  ): NestResponse {
    const drivers = this.driverService.paginate(page, limit, nameStartsWith);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/drivers?page=${page}&limit=${limit}&name=${nameStartsWith}`,
      })
      .withBody(drivers)
      .build();
  }

  @Get('/cpf/:cpf') //detalhar motorista por cpf
  public getDriveByCpf(@Param('cpf') cpf: string): NestResponse {
    const driver = this.driverService.searchDriverByCpf(cpf);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/drivers/cpf/${driver.cpf}`,
      })
      .withBody(driver)
      .build();
  }

  @Put('/update/:cpf') // atualizar dados motorista
  public updateDriver(
    @Param('cpf') cpf: string,
    @Body() body: Driver,
  ): NestResponse {
    const driverUp = this.driverService.updadeDriverService(cpf, body);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/drivers/update/${cpf}`,
      })
      .withBody(driverUp)
      .build();
  }

  @Patch(':cpf') // bloquear/desbloquear motorista
  public setBlocked(@Param('cpf') cpf: string): NestResponse {
    const driverBlock = this.driverService.setBlockedService(cpf);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/drivers/${driverBlock.cpf}`,
      })
      .withBody(driverBlock)
      .build();
  }

  @Delete('/delete/:cpf')
  public deleteDriver(@Param('cpf') cpf: string): NestResponse {
    const driver = this.driverService.deleteDriverService(cpf);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({
        Location: `/drivers/delete/${cpf}`,
      })
      .withBody(driver)
      .build();
  }
}

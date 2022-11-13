import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Driver } from './drivers.entity';

@Injectable()
export class DriversService {
  private drivers: Array<Driver> = [];

  public createDriverService(driver: Driver): Driver {
    const driverCpfExists = this.drivers.find((item) => item.cpf == driver.cpf);
    if (driverCpfExists) {
      throw new ConflictException({
        statusCode: 409,
        message: 'CPF already registered',
      });
    }
    driver.blocked = false;
    driver.jorneyRegister = 0;
    this.drivers.push(driver);
    return driver;
  }

  public paginate(page: number, limit: number, nameStart: string) {
    const indexI = page * limit;
    const indexF = indexI + limit;
    const drivers = this.drivers;

    if (nameStart) {
      return this.drivers.filter((name) =>
        name.name.toLowerCase().startsWith(nameStart.toLowerCase()),
      );
    }

    if (page < 0) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Initial page is 0. Page must be 0 or a positive number',
      });
    }

    if (drivers.length > indexI) {
      if (drivers.length > indexF) {
        return drivers.slice(indexI, indexF);
      } else {
        return drivers.slice(indexI, drivers.length);
      }
    } else {
      return [];
    }
  }

  public searchDriverByCpf(cpf: string): Driver {
    const driver = this.drivers.find((driver) => driver.cpf == cpf);
    if (!driver) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Driver not found',
      });
    }
    return driver;
  }

  public updadeDriverService(cpf: string, body: Driver): Driver {
    const driver1 = this.drivers.find((driver) => driver.cpf == cpf);
    if (!driver1) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Driver not found',
      });
    }

    const driver2 = this.drivers.find((driver) => driver.cpf == body.cpf);

    if (driver2 && driver1.cpf != driver2.cpf) {
      throw new ConflictException({
        statusCode: 409,
        message: 'CPF already registered',
      });
    }

    this.drivers.forEach((driver) => {
      if (driver.cpf == cpf) {
        driver.name = body.name;
        driver.birthDate = body.birthDate;
        driver.cpf = body.cpf;
        driver.licensePlate = body.licensePlate;
        driver.vehicleModel = body.vehicleModel;
      }
    });

    return body;
  }

  public setBlockedService(cpf: string): Driver {
    const driver = this.drivers.find((driver) => driver.cpf == cpf);
    driver.blocked = !driver.blocked;
    return driver;
  }

  public deleteDriverService(cpf: string): Driver {
    const driver = this.drivers.find((driver) => driver.cpf == cpf);
    if (!driver) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Driver not found',
      });
    }
    if (driver.jorneyRegister > 0) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Driver cannot be deleted',
      });
    }
    const newList = this.drivers.filter((drive) => drive.cpf != cpf);
    this.drivers = [...newList];
    return driver;
  }

  public cpfExists(cpf: string) {
    const driver = this.drivers.find((driver) => driver.cpf == cpf);
    return driver;
  }
}

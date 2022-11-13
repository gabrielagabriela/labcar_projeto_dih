import { IsNotEmpty } from 'class-validator';

export class Journey {
  @IsNotEmpty({
    message: 'It is required',
  })
  passengerCpfId: string;

  startAddress: Address;

  destinyAddress: Address;

  status: Status;
}

export class Address {
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  zipCode: string;
}

export enum Status {
  CREATED,
  ACCEPTED,
  REFUSED,
}

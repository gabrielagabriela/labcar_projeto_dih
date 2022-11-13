import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import { IsCpfValidator } from 'src/customValidationDecorator/cpfValidation/isCpfValid.validator';
import { IsOver18 } from 'src/customValidationDecorator/over18Validation/isOver18.validator';

export class Passenger {
  @IsNotEmpty({
    message: 'Name is required',
  })
  @MaxLength(50, {
    message: 'Maximal name length is 50 characters',
  })
  @IsString({
    message: 'Must be send as a string',
  })
  name: string;

  @IsNotEmpty({
    message: 'Birthdate is required',
  })
  @Matches(/^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19|20)\d\d$/, {
    message: 'Date must be sent in formate: MM/DD/YYYY',
  })
  @IsOver18({
    message: 'Must be 18 or older',
  })
  birthDate: Date;

  @IsNotEmpty({
    message: 'CPF is required',
  })
  @Matches(/^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/, {
    message: 'CPF must be sent in xxx.xxx.xxx-xx format',
  })
  @IsCpfValidator({
    message: 'Cpf not valid!',
  })
  @IsString({
    message: 'Must be send as a string',
  })
  cpf: string;

  address: Address;

  jorneyRegister: number;
}

export class Address {
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  zipCode: string;
}

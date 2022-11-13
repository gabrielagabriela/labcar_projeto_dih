import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint()
export class IsCpfValidatorConstraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    let j;
    let i;
    let r;

    const cpfValue = value.replace(/[^\d]+/g, '');
    if (cpfValue == '') return false;

    if (
      cpfValue.length != 11 ||
      cpfValue == '00000000000' ||
      cpfValue == '11111111111' ||
      cpfValue == '22222222222' ||
      cpfValue == '33333333333' ||
      cpfValue == '44444444444' ||
      cpfValue == '55555555555' ||
      cpfValue == '66666666666' ||
      cpfValue == '77777777777' ||
      cpfValue == '88888888888' ||
      cpfValue == '99999999999'
    )
      return false;

    j = 0;
    for (i = 0; i < 9; i++) j += parseInt(cpfValue.charAt(i)) * (10 - i);
    r = 11 - (j % 11);
    if (r == 10 || r == 11) r = 0;
    if (r != parseInt(cpfValue.charAt(9))) return false;

    j = 0;
    for (i = 0; i < 10; i++) j += parseInt(cpfValue.charAt(i)) * (11 - i);
    r = 11 - (j % 11);
    if (r == 10 || r == 11) r = 0;
    if (r != parseInt(cpfValue.charAt(10))) return false;
    return true;
  }
}

export function IsCpfValidator(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfValidatorConstraint,
    });
  };
}

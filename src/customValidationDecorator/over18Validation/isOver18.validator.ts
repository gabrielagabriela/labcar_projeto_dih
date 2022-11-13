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
export class IsOver18Constraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const today = new Date();
    const birthDay = new Date(value);

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    const birthDayYear = birthDay.getFullYear();
    const birthDayMonth = birthDay.getMonth() + 1;
    const birthDayDay = birthDay.getDate();

    let age = currentYear - birthDayYear;
    const diffMonth = currentMonth - birthDayMonth;

    if (diffMonth < 0 || (diffMonth === 0 && currentDay < birthDayDay)) {
      age--;
    }

    if (age >= 18) {
      return true;
    } else {
      return false;
    }
  }
}

export function IsOver18(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsOver18Constraint,
    });
  };
}

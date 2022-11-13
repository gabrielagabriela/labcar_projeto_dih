import { Module } from '@nestjs/common';
import { IsCpfValidatorConstraint } from 'src/customValidationDecorator/cpfValidation/isCpfValid.validator';
import { IsOver18Constraint } from 'src/customValidationDecorator/over18Validation/isOver18.validator';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';

@Module({
  controllers: [DriversController],
  providers: [DriversService, IsCpfValidatorConstraint, IsOver18Constraint],
})
export class DriversModule {}

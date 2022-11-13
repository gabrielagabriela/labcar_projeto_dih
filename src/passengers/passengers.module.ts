import { Module } from '@nestjs/common';
import { IsOver18Constraint } from 'src/customValidationDecorator/over18Validation/isOver18.validator';
import { PassengersController } from './passengers.controller';
import { PassengersService } from './passengers.service';

@Module({
  controllers: [PassengersController],
  providers: [PassengersService, IsOver18Constraint],
  exports: [PassengersService],
})
export class PassengersModule {}

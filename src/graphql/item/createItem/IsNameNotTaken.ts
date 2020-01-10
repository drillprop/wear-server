import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { Item } from '../../../entity/Item';

@ValidatorConstraint({ async: true })
export class IsNameNotTakenConstraint implements ValidatorConstraintInterface {
  validate(name: string) {
    return Item.findOne({ where: { name } }).then(item => {
      if (item) return false;
      return true;
    });
  }
  defaultMessage() {
    return 'Item with name $value already exists';
  }
}

export function IsNameNotTaken(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNameNotTakenConstraint
    });
  };
}

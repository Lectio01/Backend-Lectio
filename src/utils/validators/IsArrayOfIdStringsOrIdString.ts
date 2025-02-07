import {
  Validate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isArrayOrString', async: false })
export class IsArrayOfIdStringsOrIdStringConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string | Array<string>) {

    if (typeof value === 'string' && value.length === 24) {
      return true;
    }
    if (Array.isArray(value)) {
      return value.every(
        item => typeof item === 'string' && item.length === 24,
      );
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must contain a string or an array of strings with ids in the ObjectId format`;
  }
}

export function IsArrayOfIdStringsOrIdString(
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, property: string) {
    Validate(IsArrayOfIdStringsOrIdStringConstraint, validationOptions)(
      object,
      property,
    );
  };
}

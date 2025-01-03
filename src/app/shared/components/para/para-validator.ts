import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class ParaValidator {

  static paraRequired(c: AbstractControl): ValidationErrors | null {
    if (c.value.value <= 0) {
      return {'required': true};
    }
    return null;
  }

  static paraMin(min: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (!c.value) {
        return null;
      }
      const value = c.value;
      const floatValue = parseFloat(value.value);
      return !isNaN(floatValue) && floatValue < min ? {'min': {'min': min, 'actual': value}} : null;
    };
  }

  static paraMax(max: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (!c.value) {
        return null;
      }
      const value = c.value;
      const floatValue = parseFloat(value.value);
      return !isNaN(floatValue) && floatValue > max ? {'max': {'max': max, 'actual': value}} : null;
    };
  }
}

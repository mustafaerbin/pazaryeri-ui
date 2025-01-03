import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';

export class FormUtil {

  static disable(control: AbstractControl, value?: any) {
    control.markAsPristine();
    control.disable({emitEvent: false});
    control.setValue(value !== undefined ? value : control.value);
  }

  static enable(control: AbstractControl, value?: any) {
    control.markAsPristine();
    control.enable({emitEvent: false});
    control.setValue(value !== undefined ? value : control.value);
  }

  static addValidators(control: AbstractControl, validator: ValidatorFn) {
    if (!validator) {
      return;
    }
    control.markAsPristine();
    control.setValidators(control.validator ? Validators.compose([control.validator, validator]) : validator);
    control.updateValueAndValidity();
  }

  static addTwoWayValidator(first: AbstractControl, second: AbstractControl, validators: { first: Function; second: Function }, param: { first: string; second: string }, equal: boolean = false) {
    const paramR = {first: param.second, second: param.first};
    this.addValidators(first, validators.first.bind(null, second, {equal: equal, param: param}).call());
    this.addValidators(second, validators.second.bind(null, first, {equal: equal, param: paramR}).call());
    first.valueChanges.subscribe(() => second.updateValueAndValidity({emitEvent: false}));
    second.valueChanges.subscribe(() => first.updateValueAndValidity({emitEvent: false}));
  }

  static changeValidators(control: AbstractControl, validators: ValidatorFn | ValidatorFn[] | null = null) {
    control.markAsPristine();
    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  static addError(control: AbstractControl, validationErrorKey: string, validationErrorValue: any) {
    const errors = control.errors ? control.errors : {};
    errors[validationErrorKey] = validationErrorValue;
    if (Object.keys(errors).length) control.markAsDirty();
    control.setErrors(errors);
    console.warn("Deprecated!");
  }

  static copyMessage(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  static isProvided(value: any) {
    return value !== undefined && value !== null;
  }

  static isEmpty(value: any) {
    return value === undefined || value === null || value === '';
  }

  static getSelectItemForForm(value: any) {
    return value ? value.hasOwnProperty('value') ? (+value.value) : (+value) : null;
  }
}

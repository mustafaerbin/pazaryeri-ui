import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
  return value == null || value.length === 0 || (typeof value === "string" && value.trim().length === 0);
}

export class CustomValidator {
  static requiredOptionLabel(c: AbstractControl): ValidationErrors | null {
    /*
    optionLabel secenegi kullanildiginda value ile birlikte label da geliyor.
    {
      "label": "Seçiniz",
      "value": null
    }
     */
    const valueWithLabel: {
      label: string,
      value: any
    } = c.value;
    return isEmptyInputValue(valueWithLabel ? valueWithLabel.value : null) ? {required: true} : null;
  }

  static required(c: AbstractControl): ValidationErrors | null {
    const value = c.value;
    return isEmptyInputValue(value) ? {'required': true} : null;
  }
  static requiredSwitch(c:AbstractControl): ValidationErrors | null {
    const value = c.value;
    return ((isEmptyInputValue(value))||(value==false)) ? {'required':true} : null;
  }

  static requiredDateRange(c: AbstractControl): ValidationErrors | null {
    const value = c.value;
    return (isEmptyInputValue(value) || isEmptyInputValue(value[0]) || isEmptyInputValue(value[1])) ? {'requiredDateRange': true} : null;
  }

  static digitOnly(c: AbstractControl): ValidationErrors | null {
    const value = c.value;
    if (isEmptyInputValue(value)) {
      return null;
    }

    const regex = RegExp('^\\d+$');
    return !regex.test(value) ? {'digitOnly': true} : null;
  }

  static tcKimlikNo(c: AbstractControl): ValidationErrors | null {
    const value = c.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    if (value.length != 11) {
      return {'invalid': true};
    }

    const pr1: number = Number(value.charAt(0));
    if (pr1 == 0) {
      return {'invalid': true};
    }
    const pr2: number = Number(value.charAt(1));
    const pr3: number = Number(value.charAt(2));
    const pr4: number = Number(value.charAt(3));
    const pr5: number = Number(value.charAt(4));
    const pr6: number = Number(value.charAt(5));
    const pr7: number = Number(value.charAt(6));
    const pr8: number = Number(value.charAt(7));
    const pr9: number = Number(value.charAt(8));
    const pr10: number = Number(value.charAt(9));
    const pr11: number = Number(value.charAt(10));

    const op0 = pr1 + pr3 + pr5 + pr7 + pr9 + pr2 + pr4 + pr6 + pr8 + pr10;
    if (op0 % 10 != pr11) {
      return {'invalid': true};
    }

    const op1 = (pr1 + pr3 + pr5 + pr7 + pr9) * 7;
    const op2 = (pr2 + pr4 + pr6 + pr8) * 9;

    if ((op1 + op2) % 10 != pr10) {
      return {'invalid': true};
    }

    if ((pr1 + pr3 + pr5 + pr7 + pr9) * 8 % 10 != pr11) {
      return {'invalid': true};
    }

    return null;
  }

  static vergiKimlikNo(c: AbstractControl): ValidationErrors | null {
    const value = c.value;
    const desen = RegExp('\\d{10}');

    if (isEmptyInputValue(value)) {
      return null;
    }

    if (!desen.test(value)) {
      return {'invalid': true};
    }

    if (value.length == 10) {
      const v1 = (Number(value.charAt(0)) + 9) % 10;
      const v2 = (Number(value.charAt(1)) + 8) % 10;
      const v3 = (Number(value.charAt(2)) + 7) % 10;
      const v4 = (Number(value.charAt(3)) + 6) % 10;
      const v5 = (Number(value.charAt(4)) + 5) % 10;
      const v6 = (Number(value.charAt(5)) + 4) % 10;
      const v7 = (Number(value.charAt(6)) + 3) % 10;
      const v8 = (Number(value.charAt(7)) + 2) % 10;
      const v9 = (Number(value.charAt(8)) + 1) % 10;
      const v_last_digit = Number(value.charAt(9));

      let v11 = (v1 * 512) % 9;
      let v22 = (v2 * 256) % 9;
      let v33 = (v3 * 128) % 9;
      let v44 = (v4 * 64) % 9;
      let v55 = (v5 * 32) % 9;
      let v66 = (v6 * 16) % 9;
      let v77 = (v7 * 8) % 9;
      let v88 = (v8 * 4) % 9;
      let v99 = (v9 * 2) % 9;

      if (v1 != 0 && v11 == 0) v11 = 9;
      if (v2 != 0 && v22 == 0) v22 = 9;
      if (v3 != 0 && v33 == 0) v33 = 9;
      if (v4 != 0 && v44 == 0) v44 = 9;
      if (v5 != 0 && v55 == 0) v55 = 9;
      if (v6 != 0 && v66 == 0) v66 = 9;
      if (v7 != 0 && v77 == 0) v77 = 9;
      if (v8 != 0 && v88 == 0) v88 = 9;
      if (v9 != 0 && v99 == 0) v99 = 9;

      let toplam = v11 + v22 + v33 + v44 + v55 + v66 + v77 + v88 + v99;

      if (toplam % 10 == 0) {
        toplam = 0;
      } else {
        toplam = (10 - (toplam % 10));
      }

      if (toplam == v_last_digit) {
        return null;
      } else {
        return {'invalid': true};
      }

    } else {
      return {'invalid': true};
    }
  }

  static merciDosyaNo(c: AbstractControl): ValidationErrors | null {
    const MERCI_DOSYA_NO_ON_EK_FORMAT = '\\d{4}';
    const MERCI_DOSYA_NO_SON_EK_CIZGILI_FORMAT = '[0-9-]+';
    const MERCI_DOSYA_NO_FORMAT = MERCI_DOSYA_NO_ON_EK_FORMAT + '/' + MERCI_DOSYA_NO_SON_EK_CIZGILI_FORMAT;
    const value = c.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    const matcher = new RegExp('^(' + MERCI_DOSYA_NO_FORMAT + ')$');
    if (!matcher.test(value)) {
      return {'merciDosyaNo': true};
    }

    return null;
  }

  static merciDosyaNoSonEk(c: AbstractControl): ValidationErrors | null {
    const MERCI_DOSYA_NO_SON_EK_CIZGILI_FORMAT = '[0-9-]+';
    const value = c.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    const matcher = new RegExp('^(' + MERCI_DOSYA_NO_SON_EK_CIZGILI_FORMAT + ')$');
    if (!matcher.test(value)) {
      return {'invalid': true};
    }

    return null;
  }

  static merciDosyaNoOnEk(c: AbstractControl): ValidationErrors | null {
    const MERCI_DOSYA_NO_ON_EK_FORMAT = '\\d{4}';
    const value = c.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    const matcher = new RegExp('^(' + MERCI_DOSYA_NO_ON_EK_FORMAT + ')$');
    if (!matcher.test(value)) {
      return {'invalid': true};
    }

    return null;
  }

  static pttBarkodNo(c: AbstractControl): ValidationErrors | null {
    const PTT_BARKOD_NO_FORMAT = '\\d{13}|[a-zA-Z]{2}\\d{11}';
    const value: string = c.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    const matcher = new RegExp('^(' + PTT_BARKOD_NO_FORMAT + ')$');
    if (!matcher.test(value)) {
      return {'barkodNo': true};
    }

    return null;
  }
  static pttMTSBarkodNo(c: AbstractControl): ValidationErrors | null {
    const PTT_MTS_BARKOD_NO_FORMAT = '\\d{11}';
    const value: string = c.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    const matcher = new RegExp('^(' + PTT_MTS_BARKOD_NO_FORMAT + ')$');
    if (!matcher.test(value)) {
      return {'barkodNo': true};
    }

    return null;
  }

  static arsaPayi(c: AbstractControl): ValidationErrors | null {
    const ARSA_PAYI_FORMAT = '^\\d+/\\d+$';
    const value: string = c.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    const matcher = new RegExp('^(' + ARSA_PAYI_FORMAT + ')$');
    if (!matcher.test(value)) {
      return {'arsaPayi': true};
    }

    return null;
  }

  static ibanNo(c: AbstractControl): ValidationErrors | null {
    const value = c.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    const iban = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/);

    if (!code || iban.length !== 26) {
      return {'invalid': true};
    }

    const digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
      return letter.charCodeAt(0) - 55;
    });

    let checksum = digits.slice(0, 2), fragment;

    for (let offset = 2; offset < digits.length; offset += 7) {
      fragment = checksum + digits.substring(offset, offset + 7);
      checksum = parseInt(fragment, 10) % 97;
    }

    if (checksum != 1) {
      return {'invalid': true};
    }

    return null;
  }

  static telefonNo(c: AbstractControl): ValidationErrors | null {
    const value = c.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    const matcher = new RegExp('^[1-9][0-9]{9}');
    if (!matcher.test(value)) {
      return {'invalid': true};
    }

    if (value.length != 10) {
      return {'invalid': true};
    }

    return null;
  }

  static color(c: AbstractControl): ValidationErrors | null {
    const value = c.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    const matcher = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');
    if (!matcher.test(value)) {
      return {'invalid': true};
    }

    return null;
  }

  static email(c: AbstractControl): ValidationErrors | null {
    const value = c.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    const regex = '^[a-z0-9!#$%&\'\'*+/=?^_`{}~-]+(\\.[a-z0-9!#$%&\'\'*+/=?^_`{}~-]+)*@([a-z0-9]([a-z0-9-]*[a-z0-9])?\\.)+([A-Z]{2}|arpa|biz|com|info|intww|name|net|org|pro|aero|asia|cat|coop|xyz|edu|gov|jobs|mil|mobi|museum|pro|tel|travel|post|tr)$';
    return Validators.pattern(regex)(c) ? {'email': true} : null;
  }

  static multiEmail(c: AbstractControl): ValidationErrors | null {
    const value = c.value;
    if (isEmptyInputValue(value)) {
      return null;
    }
    let valueArray = value.split(';');
    let kontrol = false;
    const regex = '^[a-z0-9!#$%&\'\'*+/=?^_`{}~-]+(\\.[a-z0-9!#$%&\'\'*+/=?^_`{}~-]+)*@([a-z0-9]([a-z0-9-]*[a-z0-9])?\\.)+([A-Z]{2}|arpa|biz|com|info|intww|name|net|org|pro|aero|asia|cat|coop|xyz|edu|gov|jobs|mil|mobi|museum|pro|tel|travel|post|tr)$';
    const matcher = new RegExp('^(' + regex + ')$');
    valueArray.forEach(val=>{
      if(!matcher.test(val)){
        kontrol = true;
      }
    });
    return kontrol ? {'email': true} : null;
  }

  static gsmNo(c: AbstractControl): ValidationErrors | null {
    const value = c.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    const matcher = new RegExp('^[5][0-9]{9}');

    if (!matcher.test(value)) {
      return {'invalid': true};
    }

    if (value.length != 10) {
      return {'invalid': true};
    }

    return null;
  }

  static beforeToday(bugunDahilMi: boolean = false, saatDahilMi: boolean = false): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (!c.value) {
        return null;
      }
      const value = new Date(c.value);
      const today = new Date();

      if (!saatDahilMi) {
        today.setHours(0, 0, 0, 0);
        value.setHours(0, 0, 0, 0);
      }

      if (bugunDahilMi) {
        if (value > today) {
          return {'afterToday': true};
        }
      } else {
        if (value >= today) {
          return {'afterEqualToday': true};
        }
      }
      return null;
    };
  }

  static afterToday(bugunDahilMi: boolean = false, saatDahilMi: boolean = false): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (!c.value) {
        return null;
      }
      const value = new Date(c.value);
      const today = new Date();

      if (!saatDahilMi) {
        today.setHours(0, 0, 0, 0);
        value.setHours(0, 0, 0, 0);
      }

      if (bugunDahilMi) {
        if (value < today) {
          return {'beforeToday': true};
        }
      } else {
        if (value <= today) {
          return {'beforeEqualToday': true};
        }
      }
      return null;
    };
  }

  static beforeDate(secondDate: AbstractControl,
                    params: { equal?: boolean, param: { first: string, second: string } } = {
                      equal: false,
                      param: null
                    }) {
    return (c: AbstractControl): ValidationErrors | null => {
      if (!c.value || !secondDate.value) {
        return null;
      }

      if (params.equal) {
        if (c.value > secondDate.value) {
          return {'afterDate': params.param};
        }
      } else {
        if (c.value >= secondDate.value) {
          return {'afterEqualDate': params.param};
        }
      }
    };
  }

  static afterDate(secondDate: AbstractControl,
                   params: { equal?: boolean, param: { first: string, second: string } } = {
                     equal: false,
                     param: null
                   }) {
    return (c: AbstractControl): ValidationErrors | null => {
      if (!c.value || !secondDate.value) {
        return null;
      }

      if (params.equal) {
        if (c.value < secondDate.value) {
          return {'beforeDate': params.param};
        }
      } else {
        if (c.value <= secondDate.value) {
          return {'beforeEqualDate': params.param};
        }
      }
    };
  }

  static paraRequired(c: AbstractControl): ValidationErrors | null {
    if (c.value.value <= 0) {
      return {'required': true};
    }
    return null;
  }
}

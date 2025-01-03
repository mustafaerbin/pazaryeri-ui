import {Component, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import { AppStore } from '../utils/app.store';


@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnChanges {

  @Input() validationControl: AbstractControl;

  errorMessage;

  constructor(private appStore: AppStore,
              private renderer: Renderer2,
              private elRef: ElementRef) {
  }

  ngOnChanges(): void {
    if (this.validationControl.errors) {
      this.renderer.parentNode(this.elRef.nativeElement).children[0].style.color = '#d9534f';
    } else {
      this.renderer.parentNode(this.elRef.nativeElement).children[0].style.cssText  = '';
    }

    this.validationControl.statusChanges.subscribe(a => {
      const errors = this.validationControl.errors;
      if (errors != null) {
        this.renderer.parentNode(this.elRef.nativeElement).children[0].style.color = '#d9534f';

        if (this.validationControl.enabled) {
          Object.keys(errors).forEach(keyError => {
            this.errorMessage = this.getMessage(errors, keyError);
          });
        }
      } else {
        this.renderer.parentNode(this.elRef.nativeElement).children[0].style.cssText  = '';
        this.errorMessage = {};
      }
    });
  }


  private getMessage(errors: ValidationErrors, keyError: string) {
    switch (keyError) {
      case 'required': {
        return {msg: 'error.validation.required'};
      }
      case 'min': {
        return {msg: 'error.validation.min.value', param: {value: errors[keyError].min}};
      }
      case 'max': {
        return {msg: 'error.validation.max.value', param: {value: errors[keyError].max}};
      }
      case 'minlength': {
        return {msg: 'error.validation.min.length', param: {value: errors[keyError].requiredLength}};
      }
      case 'maxlength': {
        return {msg: 'error.validation.max.length', param: {value: errors[keyError].requiredLength}};
      }
      case 'pattern': {
        return {msg: 'error.validation.pattern', param: {value: errors[keyError].requiredPattern}};
      }
      case 'yurtIciRequired': {
        return {msg: 'error.validation.cografi.birim.yurt.ici.required'};
      }
      case 'yurtDisiRequired': {
        return {msg: 'error.validation.cografi.birim.yurt.disi.required'};
      }
      case 'ulkeRequired': {
        return {msg: 'error.validation.cografi.birim.ulke.required'};
      }
      case 'ilRequired': {
        return {msg: 'error.validation.cografi.birim.il.required'};
      }
      case 'ilceRequired': {
        return {msg: 'error.validation.cografi.birim.ilce.required'};
      }
      case 'adliyeRequired': {
        return {msg: 'error.validation.adliye.required'};
      }
      case 'icraMudurluguRequired': {
        return {msg: 'error.validation.icra.mudurlugu.required'};
      }
      case 'mahkemeRequired': {
        return {msg: 'error.validation.mahkeme.required'};
      }
      case 'afterToday': {
        return {msg: 'error.validation.after.today'};
      }
      case 'afterEqualToday': {
        return {msg: 'error.validation.after.equal.today'};
      }
      case 'afterDate': {
        return this.prepareErrorMessage('error.validation.after.date', errors[keyError]);
      }
      case 'afterEqualDate': {
        return this.prepareErrorMessage('error.validation.after.equal.date', errors[keyError]);
      }
      case 'beforeToday': {
        return {msg: 'error.validation.before.today'};
      }
      case 'beforeEqualToday': {
        return {msg: 'error.validation.before.equal.today'};
      }
      case 'beforeDate': {
        return this.prepareErrorMessage('error.validation.before.date', errors[keyError]);
      }
      case 'beforeEqualDate': {
        return this.prepareErrorMessage('error.validation.before.equal.date', errors[keyError]);
      }
      case 'email': {
        return {msg: 'error.validation.email'};
      }
      case 'merciDosyaNo': {
        return {msg: 'error.merci.dosya.no'};
      }
      case 'barkodNo': {
        return {msg: 'error.validation.barkod.no'};
      }
      case 'digitOnly': {
        return {msg: 'error.validation.digit.only'};
      }
      case 'invalid': {
        return {msg: 'error.validation.invalid'};
      }
      case 'arsaPayi': {
        return {msg: 'error.validation.arsa.payi'};
      }
      case 'sorumluPersonelValidation': {
        return {msg: 'error.secilen.personel.dava.takip.bolumunde.olmalidir'}
      }
      case 'beforeThisYear': {
        return {msg: 'error.validation.before.this.year'};
      }
      case 'minValue': {
        return this.prepareErrorMessage('error.validation.minimum.value', errors[keyError]);
      }
      case 'maxValue': {
        return this.prepareErrorMessage('error.validation.maximum.value', errors[keyError]);
      }
      case 'sistemKodu': {
        return {msg: 'error.validation.sistem.kodu'};
      }
      case 'requiredDateRange': {
        return {msg: 'error.validation.date.range'};
      }
    }
  }

  private prepareErrorMessage(key: string, params: { [key: string]: any }): ValidationErrors | null {
    Object.keys(params).forEach(key => {
      params[key] = this.appStore.translate.instant(params[key]);
    });

    return {msg: key, param: params};
  }
}

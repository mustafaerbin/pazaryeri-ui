import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractBaseComponent} from '../abstract-base-component';
import {AppStore} from '../../utils/app.store';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Para} from './para';
import {Constants} from '../../utils/constants';

@Component({
  selector: 'app-para',
  templateUrl: './para.component.html',
  styleUrls: ['./para.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ParaComponent),
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class ParaComponent extends AbstractBaseComponent implements OnInit, ControlValueAccessor {

  @Input() disableParaBirimi = false;
  @Input() isDisabled: boolean = false;
  @Input() hideParaBirimi: boolean = false;
  @ViewChild('integerRef', { static: true }) integerRef: ElementRef;
  @ViewChild('decimalRef', { static: true }) decimalRef: ElementRef;
  public para: Para = new Para(0, '949');
  public dropdownClass: string;
  public paraBirimiList = Constants.paraBirimiList;
  private integerPart: number = 0;
  private decimalPart: number = 0;
  private onChange = (_: any) => {
  };

  constructor(appStore: AppStore) {
    super(appStore);
  }

  private static style(value: string): string {
    let ret = [];
    let reverse = ParaComponent.reverse(value);

    for (let i = 0; i < reverse.length; i++) {
      if (i !== 0 && i % 3 === 0) {
        ret.push('.');
      }
      ret.push(reverse[i]);
    }
    return ParaComponent.reverse(ret.join(''));
  }

  private static reverse(value: string): string {
    let array = value.split('');
    array = array.reverse();
    return array.join('');
  }

  writeValue(obj: any): void {
    if (obj) {

      if (obj.paraBirimi) {
        this.para.paraBirimi = obj.paraBirimi;
      }

      if (obj.value !== null && obj.value !== undefined) {
        this.integerPart = Math.floor(obj.value);
        this.decimalPart = Number(((obj.value % 1) * 100).toFixed(2));
        this.para.value = obj.value;
      }
    }else{
      this.para = new Para(0, '949');
      this.integerPart = 0;
      this.decimalPart = 0;
    }

    obj = this.para;
    this.dropdownClass = this.getParaBirimiClass();
    this.fix();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  ngOnInit() {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public updateInteger(intValue) {
    this.setValue(intValue, this.decimalPart.toString());
  }

  public updateDecimal(decimalValue) {
    this.setValue(this.integerPart.toString(), decimalValue);
  }

  public fix() {
    this.integerRef.nativeElement.value = ParaComponent.style(this.integerPart.toString());
    this.decimalRef.nativeElement.value = (this.decimalPart + 100).toString().substr(1);
  }

  public paraBirimiChange(event) {
    this.dropdownClass = this.getParaBirimiClass();
    this.onChange(this.para);
  }

  private setValue(intValue, decimalValue) {
    intValue = intValue.replace(/\D/g, '');
    decimalValue = decimalValue.replace(/\D/g, '');

    if (intValue !== '') {
      this.integerPart = Number(intValue);
      this.integerRef.nativeElement.value = ParaComponent.style(this.integerPart.toString());
    } else {
      this.integerPart = 0;
      this.integerRef.nativeElement.value = intValue;
    }

    if (decimalValue !== '' && decimalValue !== '0') {
      this.decimalPart = Number(decimalValue);
      if (decimalValue.length === 1) {
        this.decimalRef.nativeElement.value = this.decimalPart.toString();
        this.decimalPart = this.decimalPart * 10;
      } else {
        if (this.decimalPart.toString().length === 1) {
          this.decimalRef.nativeElement.value = '0' + this.decimalPart.toString();
        } else {
          this.decimalRef.nativeElement.value = this.decimalPart.toString();
        }
      }

    } else if (decimalValue === '0') {
      this.decimalPart = 0;
    } else {
      this.decimalPart = 0;
      this.decimalRef.nativeElement.value = decimalValue;
    }
    this.para.value = this.integerPart + (this.decimalPart / 100);
    this.onChange(this.para);
  }

  private getParaBirimiClass(): string {
    if (this.paraBirimiList.find((value) => {
      return value.value === this.para.paraBirimi;
    }))

    if (this.paraBirimiList.find((value) => {
        return value.value === this.para.paraBirimi;
      }).icon === '') {
      return 'para-birimi-dropdown-label';
    }
    return 'para-birimi-dropdown-icon';
  }

}

import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Constants} from '../../utils/constants';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_FMT, '+0300', 'tr');
  }
}

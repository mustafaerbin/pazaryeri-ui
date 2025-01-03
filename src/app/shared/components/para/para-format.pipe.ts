import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Constants} from '../../utils/constants';

@Pipe({
  name: 'paraFormat'
})
export class ParaFormatPipe extends DecimalPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, Constants.PARA_FMT);
  }
}

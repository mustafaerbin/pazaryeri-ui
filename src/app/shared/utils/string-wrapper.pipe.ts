import {Pipe, PipeTransform} from '@angular/core';
import {FormUtil} from './form-util';

@Pipe({
  name: 'wrap'
})
export class StringWrapperPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    if (args == undefined || args == null || args == true) {
      if (FormUtil.isProvided(value) && `${value}`.trim().length) {
        value = `(${value})`;
      }
    }

    return value;
  }
}

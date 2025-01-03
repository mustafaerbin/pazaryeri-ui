import {Constants} from '../../utils/constants';

export class Para {
  value: number;
  paraBirimi: string;

  constructor(value: number, paraBirimi: string) {
    this.value = value;
    this.paraBirimi = paraBirimi;
  }

  static newInstance() {
    return new Para(0, '949');
  }

  static get(value?: number, paraBirimi?: string) {
    if (!value) {
      value = 0;
    }
    if (!paraBirimi) {
      paraBirimi = '949';
    }
    return new Para(value, paraBirimi);
  }

  static isProvided(para: any) {
    return para !== undefined && para !== null;
  }

  static getParaBirimiClass(value) {
    // @ts-ignore
    return Constants.paraBirimiList.find((value1) => {
      return value === value1.value;
    }).icon;
  }

  static getParaBirimiLabel(value) {
    // @ts-ignore
    return Constants.paraBirimiList.find((value1) => {
      return value === value1.value;
    }).label;
  }
}

import * as moment from "moment";

export class DateUtils {

  static getDate(addDays: number = 0): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() + addDays);
    return today;
  }

  static addDate(date: Date, addDays: number = 0): Date {
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + addDays);
    return date;
  }

  static addMonth(date: Date, month: number = 0): Date {
    date.setMonth(date.getMonth() + month);
    return date;
  }

  static trimDate(date: Date): Date {
    if (date === null) {
      return null;
    }
    const today = new Date(date);
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate());
    return today;
  }

  static getDateRange(firstDate: Date, lastDate: Date) {
    let rangeDates: Date[];
    if (lastDate !== null && firstDate !== null) {
      rangeDates = [DateUtils.trimDate(firstDate), DateUtils.trimDate(lastDate)];
    } else if (lastDate !== null && firstDate === null) {
      rangeDates = [new Date(0), DateUtils.trimDate(lastDate)];
    } else if (lastDate === null && firstDate !== null) {
      rangeDates = [DateUtils.trimDate(firstDate), DateUtils.getDate()];
    }
    return rangeDates;
  }

  static getDateForForm(date: Date) {
    return date ? new Date(date) : null;
  }

  static getManuelValueDateFormat(eventValue: any, dateFormat: any) {
    let formatedDate = moment(eventValue, dateFormat).toDate();
    return this.isDateValid(formatedDate) ? formatedDate : null;
  }

  static isDateValid(date: Date) {
    return date instanceof Date && !isNaN(date.getTime());
  }

  static getDateExcludeTime(date: Date): Date {
    if (date == null) {
      return null;
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}

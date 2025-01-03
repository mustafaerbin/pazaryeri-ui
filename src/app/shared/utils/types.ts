import { ColumnType } from '../components/abstract-base-component';

export type customHtml= { field:string,predicate:(e)=>boolean,datas: {label: string, fieldSub: string,columnType?:ColumnType,predicate?:(...e)=>boolean}[] };

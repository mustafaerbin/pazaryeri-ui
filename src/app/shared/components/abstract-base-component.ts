import {AppResponse} from '../model/app-response';
import {Observable} from 'rxjs';
import {AppStore} from '../utils/app.store';
import {CustomErrorHandler} from '../../error/custom-error-handler';
import {AppError} from '../../error/dto/app-error';
import {HttpStatus} from '../utils/constants';
import {Para} from './para/para';
import {HttpResponse} from '@angular/common/http';
import {customHtml} from '../utils/types';

export abstract class AbstractBaseComponent {

  ColumnType: any = {
    NUMBER: ColumnType.NUMBER,
    DECIMAL: ColumnType.DECIMAL,
    PARA: ColumnType.PARA,
    PARA_OBJECT: ColumnType.PARA_OBJECT,
    STRING: ColumnType.STRING,
    ENUM: ColumnType.ENUM,
    DATE: ColumnType.DATE,
    DATE_TIME: ColumnType.DATE_TIME,
    KULLANICI: ColumnType.KULLANICI,
    CUSTOM: ColumnType.CUSTOM,
    CUSTOM1: ColumnType.CUSTOM1,
    HTML: ColumnType.HTML,
    MASTERCOLON: ColumnType.MASTERCOLON,
    TRANSLATE: ColumnType.TRANSLATE
  };

  public appStore: AppStore;

  constructor(appStore: AppStore) {
    this.appStore = appStore;
  }

  protected subscribeToResponseBase(result: Observable<AppResponse>, successFN: Function, errorFN?: Function) {
    result.subscribe((res: AppResponse) =>
        this.onSuccess(res, successFN, errorFN),
      (res: Response) => {
        this.handleError(res.status || HttpStatus.INTERNAL_SERVER_ERROR, 'Bilinmeyen sunucu hatası oluştu.');
      });
  }

  protected subscribeToResponse(result: Observable<AppResponse>, successFN: Function, errorFN?: Function) {
    this.startFN();
    this.subscribeToResponseBase(result, successFN, errorFN);
  }

  protected onSuccess(result: AppResponse, successFN: Function, errorFN: Function) {
    if (result.status === HttpStatus.OK) {
      if (!!successFN) {
        successFN.bind(this, result.data, result.pageInfo).call();
      }
      this.endFN();
    } else {
      if (!!errorFN) {
        errorFN.bind(this).call();
      }
      this.handleError(result.status, result.errorMessage);
      this.endFN();
    }
  }

  protected handleError(status, message) {
    CustomErrorHandler.handleError(AppError.new(status, message));
    this.appStore.addMessage({severity: 'error', summary: '', detail: message});
    this.endFN();
  }

  protected handleHttpResponse(event: HttpResponse<AppResponse>, successFN: Function, errorFN?: Function) {
    event = event || new HttpResponse();
    if (event.status == HttpStatus.OK) {
      this.onSuccess(event.body, successFN, errorFN);
    } else {
      this.handleError(event.status || HttpStatus.INTERNAL_SERVER_ERROR, 'Unhandled server error.');
    }
  }

  protected startFN() {
  }

  protected endFN() {
  }

  buildData(val, cols) {
    if (cols) {
      cols.forEach(col => {
        if (col.type === ColumnType.ENUM) {
          val.map(
            value => {
              try {
                value[col.field + '_ack'] = value[col.field] !== null ? this.appStore.translate.instant(col.enum[value[col.field]]) : '';
              } catch (ex) {
                value[col.field + '_ack'] = value[col.field] !== null ? col.field + ':' + value[col.field] : ''; //js enum da kod tanimli degilse
              }
              return value;
            });
        } else if (col.type === ColumnType.TRANSLATE) {
          val.map(
            value => {
              value[col.field + '_trns'] = value[col.field] !== null ? this.appStore.translate.instant(value[col.field]) : '';
              return value;
            });
        } else if (col.type === ColumnType.PARA_OBJECT) {
          val.map(
            value => {
              let para: Para = value[col.field];
              if (!para || !para.value) {
                value[col.field] = Para.newInstance();
              } else if (!para.paraBirimi) {
                value[col.field] = Para.get(para.value);
              }
            }
          );
        }
      });
    }
    return val;
  }

}

export enum ColumnType {
  NUMBER,
  DECIMAL,
  PARA,
  PARA_OBJECT,
  STRING,
  ENUM,
  DATE,
  TRANSLATE,
  DATE_TIME,
  KULLANICI,
  CUSTOM,
  CUSTOM1,
  HTML,
  MASTERCOLON
}

export enum ExportFileType {
  EXCELL, PDF
}

export interface Col {
  field: string;
  customHtmls?: customHtml[] | undefined | null;
  subfield?: string;
  header?: string;
  type: ColumnType;
  enum?: any;
  label?: string;
  footer?: Function;
  class?: string;
  actionFn?: Function;
  classFn?: Function;
  masterColonFn?: Function;
  toolTip?: Function;
  sortable?: boolean;
  hidden?: boolean;
}

export interface Operations {
  id: string;
  tooltip: string;
  class: string;
  route?: string;
  routeBase?: string;
  rendered?: Function;
  event?: Function;
}

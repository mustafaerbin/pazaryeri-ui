import {Injectable} from '@angular/core';
import {AppStore} from '../../shared/utils/app.store';
import {ErrorData} from '../dto/error-data';
import html2canvas from 'html2canvas';
import {AppError} from '../dto/app-error';

declare global {
  interface HTMLCanvasElement {
    msToBlob(): Blob;
  }
}

@Injectable()
export class ErrorService {

  constructor(private appStore: AppStore) {
  }

  private _errors: ErrorData[] = [];

  get isError(): boolean {
    return !!this._errors.length;
  }

  get errors(): ErrorData[] {
    return this._errors.slice();
  }

  addError(error: AppError) {
    const errorData: ErrorData = {
      error: error,
      blob: undefined,
      url: this.appStore.location.path(),
      appStore: this.getAppStoreSnapshot()
    };
    this._errors.push(errorData);
    this.takeScreenShot(errorData);
  }

  clearErrors() {
    this._errors = [];
  }

  private takeScreenShot(errorData: ErrorData) {
    html2canvas(document.querySelector<HTMLElement>('app-root'), {logging: false}).then(canvas => {
      if (HTMLCanvasElement.prototype.toBlob) {
        canvas.toBlob((blob: Blob) => {
          errorData.blob = blob;
        });
      } else {
        errorData.blob = canvas.msToBlob();
      }
    });
  }

  private getAppStoreSnapshot() {
    const snapshot = {};
    snapshot['kullanici'] = this.appStore.kullanici;
    snapshot['breadcrumbs'] = this.appStore.breadcrumbs;
    snapshot['yetkiMap'] = Array.from(this.appStore.yetkiMap.entries());
    return snapshot;
  }
}

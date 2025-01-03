import {Component, ViewEncapsulation} from '@angular/core';
import {AppStore} from '../../shared/utils/app.store';
import {ErrorService} from '../service/error.service';
import {ErrorData} from '../dto/error-data';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ErrorComponent {

  message: string;
  showError: boolean = false;

  constructor(public appStore: AppStore,
              public errorService: ErrorService) {
  }

  openDialog() {
    this.showError = true;
  }

  clickDownload() {
    this.downloadZip();
  }

  // noinspection JSMethodCanBeStatic
  clickRefresh() {
    window.location.reload();
  }

  private downloadZip() {
    const jsZip = new JSZip();
    const errors = this.errorService.errors;

    for (let i = 0; i < errors.length; i++) {
      const error = errors[i];
      const folder = `${i + 1}`;

      jsZip.folder(folder);
      // @ts-ignore
      jsZip.file(folder + '/console.log', error.error.stack);
      jsZip.file(folder + '/info.log', JSON.stringify(this.prepareData(error), null, '\t'));
      jsZip.file(folder + '/screenshot.png', error.blob);
    }

    jsZip.generateAsync({type: 'blob'}).then(zip => {
      FileSaver.saveAs(zip, 'error_logs.zip');
      this.errorService.clearErrors();
      this.showError = false;
    });
  }

  private prepareData(error: ErrorData) {
    return {
      url: error.url,
      appStore: error.appStore,
      message: this.message,
      userAgent: window.navigator.userAgent,
      localStorage: localStorage,
      date: new Date()
    };
  }
}

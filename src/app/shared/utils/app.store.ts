import {EventEmitter, Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmData, ConfirmType} from '../model/confirm-data';
import {SelectService} from '../config/select.service';
import {HttpStatus} from './constants';
import {AuthService} from '../auth/auth.service';
import {AppResponse} from '../model/app-response';
import {Para} from '../components/para/para';
import {ConfirmationService, MenuItem, Message, MessageService, PrimeNGConfig, SelectItem} from "primeng/api";
import {Router} from "@angular/router";

@Injectable()
export class AppStore {
  static instance: AppStore;

  para = Para;
  dateFormat = 'dd.mm.yy';
  breadcrumbs: MenuItem[] = [];
  kullanici;
  yetkiMap = new Map();
  private _confirmData: ConfirmData;
  _message;
  header: string;

  sirketTemaUpdateEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(public messageService: MessageService,
              private primengConfig: PrimeNGConfig,
              private _translate: TranslateService,
              private _location: Location,
              private _confirmationService: ConfirmationService,
              private _selectService: SelectService,
              private authService: AuthService,
              private _router: Router) {
    AppStore.instance = this;
  }


  private _loading = false;
  get loading() {
    return this._loading;
  }

  set loading(_loading: boolean) {
    this._loading = _loading;
  }

  private _waitingServices: string[] = [];
  get waitingServices(): string[] {
    return this._waitingServices;
  }

  set waitingServices(value: string[]) {
    this._waitingServices = value;
  }

  get location(): Location {
    return this._location;
  }

  get selectService(): SelectService {
    return this._selectService;
  }

  get translate(): TranslateService {
    return this._translate;
  }

  getRouter(): Router {
    return this._router;
  }

  static getNativeWindow() {
    return window;
  }

  private static sortStatic(a: SelectItem, b: SelectItem): number {
    if (a.label != null && b.label != null) {
      return a.label.localeCompare(b.label);
    }
    return 0;
  }

  appInit(data) {
    console.log(data);
  }

  public init() {
    this._translate.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
  }

  addMessage(message: Message, instant: boolean = true) {
    if (instant) {
      this.messageService.clear();
      this.messageService.add(message);
      this.scrollTop();
    } else {
      this._message = message;
    }
  }

  clearMessage() {
    this.messageService.clear();
  }

  addAllMessage(messages: Message[]) {
    this.messageService.clear();
    this.messageService.addAll(messages);
    this.scrollTop();
  }

  public confirm(confirmData: ConfirmData) {
    this._confirmData = this.buildConfirmData(confirmData);
    this._confirmationService.confirm({
      message: this._confirmData.message,
      header: this._confirmData.header,
      icon: this._confirmData.icon,
      accept: () => {
        if (this._confirmData.acceptFunction !== undefined) {
          this._confirmData.acceptFunction.bind(this).call();
        } else {
          this.addInstantSuccessMessage();
        }
      },
      reject: () => {
        if (this._confirmData.rejectFunction !== undefined) {
          this._confirmData.rejectFunction.bind(this).call();
        } else {
          if (this._confirmData.type == ConfirmType.SIL) {
            this.addInstantRejectMessage();
          } else {
            this.addRejectMessage();
            this.location.back();
          }
        }
      }
    });
  }

  public broadcastMessage(delay: number = 0) {
    setTimeout(() => {
      this.clearMessage();
      this.addMessage(this._message);
      this._message = '';
    }, delay);
  }

  public addSuccessMessage() {
    this._message = {
      severity: 'success',
      summary: this._confirmData.acceptSummary,
      detail: this._confirmData.acceptDetail
    };
  }

  public genericAddSuccessMessage(summaryObj?: string) {
    this._message = {
      severity: 'success',
      summary: summaryObj ? summaryObj : this._confirmData.acceptSummary,
      detail: this._confirmData.acceptDetail
    };
  }

  public addInstantSuccessMessage() {
    this.addSuccessMessage();
    this.broadcastMessage();
  }

  public addRejectMessage() {
    this._message = {
      severity: 'info',
      summary: this._confirmData.rejectSummary,
      detail: this._confirmData.rejectDetail
    };
  }

  public addInstantRejectMessage() {
    this.addRejectMessage();
    this.broadcastMessage();
  }

  sort(list: any[], nullable ?: boolean): any[] {
    if (!list) {
      return list
    }
    const sortList = list.slice();
    sortList.sort(AppStore.sortStatic);
    if (nullable) {
      sortList.unshift({label: this.translate.instant('SECINIZ'), value: null});
    }
    return sortList;
  }

  initYetki(yetkiLink: string) {
    if (!this.yetkiMap.has(yetkiLink)) {
      this.authService.isAuthenticated(yetkiLink).subscribe(value => {
        if (value.status === HttpStatus.OK) {
          this.yetkiMap.set(yetkiLink, value.data);
        } else {
          this.yetkiMap.set(yetkiLink, false);
        }
      }, () => {
        this.yetkiMap.set(yetkiLink, false);
      });
    }
  }

  ifGranted(yetkiLink: string, successFN: Function) {
    if (!successFN) {
      return;
    }
    if (this.yetkiMap.has(yetkiLink)) {
      successFN.bind(this, this.yetkiMap.get(yetkiLink)).call();
    } else {
      this.authService.isAuthenticated(yetkiLink).subscribe((res: AppResponse) => {
        if (res.status === HttpStatus.OK) {
          this.yetkiMap.set(yetkiLink, res.data);
          successFN.bind(this, res.data).call();
        } else {
          this.yetkiMap.set(yetkiLink, false);
        }
      }, () => {
        this.yetkiMap.set(yetkiLink, false);
      });
    }
  }

  initYetkiMulti(yetkiLinks: string[], successFN: Function) {

    // yetkiLinks.forEach(v => {
    //   this.yetkiMap.set(v, false);
    // });
    //
    // this.authService.isAuthenticatedMulti(yetkiLinks).subscribe(res => {
    //   if (res.status === HttpStatus.OK) {
    //     res.data.forEach(v => {
    //       this.yetkiMap.set(v, true);
    //       successFN.bind(this, res.data).call();
    //     });
    //   }
    // });
  }

  ifGrantedPromise(yetkiLink: string) {
    return new Promise(resolve => {
      this.ifGranted(yetkiLink, yetkiSucces => {
        resolve(yetkiSucces);
      });
      resolve(false);
    });
  }

  async ifGrantedAsync(yetkiLink: string) {
    return <boolean>await this.ifGrantedPromise(yetkiLink);
  }

  getData(key: string): any {
    const item = localStorage.getItem(key);
    this.prepareDataForTest(key, item);
    localStorage.removeItem(key);

    if (item) {
      try {
        return JSON.parse(item);
      } catch (e) {
        return item;
      }
    } else {
      return null;
    }
  }

  getDataWithoutJsonParse(key: string): any {
    const item = localStorage.getItem(key);
    this.prepareDataForTest(key, item);
    localStorage.removeItem(key);
    return item;
  }

  private prepareDataForTest(key: string, item: any) {
    localStorage.setItem('test_key', key);
    localStorage.setItem('test_item', item);
  }

  setData(key: string, value: any) {
    if (typeof value !== 'number' && typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
    console.info('Deprecated.');
  }

  public fileUpdateState: boolean = false;
  setFileUpdateState(fileUpdateState: boolean){
    this.fileUpdateState = fileUpdateState;
  }

  getMap(key: string): any {
    const item = sessionStorage.getItem(key);

    if (item) {
      try {
        return JSON.parse(item);
      } catch (e) {
        return item;
      }
    } else {
      return null;
    }
  }

  setMap(key: string, value: any) {
    if (typeof value !== 'number' && typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    sessionStorage.setItem(key, value);
  }



  private buildConfirmData(confirmData: ConfirmData) {
    const _confirmData = confirmData;
    _confirmData.type = confirmData.type || ConfirmType.ONAY;
    _confirmData.acceptDetail = confirmData.acceptDetail || '';
    _confirmData.rejectDetail = confirmData.rejectDetail || '';
    _confirmData.icon = confirmData.icon || 'fa fa-question-circle';
    if (_confirmData.message === undefined) {
      _confirmData.message = this._translate.instant('label.onay.message');
    }
    let label = '';
    if (_confirmData.type === ConfirmType.ONAY) {
      label = 'onay';
    } else if (_confirmData.type === ConfirmType.GUNCELLE) {
      label = 'guncelle';
    } else if (_confirmData.type === ConfirmType.RED) {
      label = 'red';
    } else if (_confirmData.type === ConfirmType.KAYDET) {
      label = 'kaydet';
    } else if (_confirmData.type === ConfirmType.SIL) {
      _confirmData.icon = confirmData.icon || 'fa fa-trash-alt';
      label = 'sil';
    }
    if (_confirmData.header === undefined) {
      _confirmData.header = this._translate.instant('label.' + label + '.header');
    }
    if (_confirmData.acceptSummary === undefined) {
      _confirmData.acceptSummary = this._translate.instant('label.' + label + '.accept.summary');
    }
    if (_confirmData.rejectSummary === undefined) {
      _confirmData.rejectSummary = this._translate.instant('label.' + label + '.reject.summary');
    }
    return _confirmData;
  }

  private scrollTop() {
    setTimeout(() => {
      // @ts-ignore
      document.getElementById("mainContent").scrollTop = 0;
    }, 16);
  }

  public getBreadcrumbPath() {
    var path = "";
    if (this.breadcrumbs != undefined) {
      for (let i = 0; i < this.breadcrumbs.length; i++) {
        if (path !== "") {
          path = path.concat("->");
        }
        // @ts-ignore
        path = path.concat(this.breadcrumbs[i].label);
      }
    }
    return path;
  }
}

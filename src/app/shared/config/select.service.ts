import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SelectItem} from 'primeng/api';
import {AbstractService} from './abstract-service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppResponse} from '../model/app-response';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SelectItemDetail} from "../../domain/select/select-item-detail";

@Injectable()
export class SelectService extends AbstractService {
  constructor(private translate: TranslateService,
              private http: HttpClient) {
    super();
  }

  private static sort(a: SelectItem, b: SelectItem): number {
    if (!!a.label) {
      // @ts-ignore
      return a.label.localeCompare(b.label);
    }
    return 1;
  }

  getAll(ENUM, nullable: boolean = true, sort: boolean = true): SelectItem [] {
    const list: SelectItem[] = [];
    Object.keys(ENUM).map(e => {
      if (!(parseInt(e, 10) >= 0)) {
        list.push({label: this.translate.instant(e), value: ENUM[e]});
      }
    });

    if(sort){
      list.sort(SelectService.sort);
    }

    if (nullable) {
      list.unshift({label: this.translate.instant('SECINIZ'), value: null});
    }
    return list;
  }

  getAllNotSorted(ENUM, nullable: boolean = true): SelectItem [] {
    const list: SelectItem[] = [];
    Object.keys(ENUM).map(e => {
      if (!(parseInt(e, 10) >= 0)) {
        list.push({label: this.translate.instant(e), value: ENUM[e]});
      }
    });
    if (nullable) {
      list.unshift({label: this.translate.instant('SECINIZ'), value: null});
    }
    return list;
  }

  getSelected(ENUM, nullable: boolean = true, ...enums: any[]): SelectItem [] {
    return this.getSelectedByArray(ENUM, nullable, enums);
  }

  getSelectedByArray(ENUM, nullable: boolean = true, enums: any[]): SelectItem [] {
    const list: SelectItem[] = [];
    enums.map(enumValue => {
      list.push({label: this.translate.instant(ENUM[enumValue]), value: enumValue});
    });
    list.sort(SelectService.sort);
    if (nullable) {
      list.unshift({label: this.translate.instant('SECINIZ'), value: null});
    }
    return list;
  }

  getUnSelected(ENUM, nullable: boolean = true, ...enums: any[]): SelectItem [] {
    return this.getUnSelectedByArray(ENUM, nullable, enums);
  }

  getUnSelectedByArray(ENUM, nullable: boolean = true, enums: any[]): SelectItem [] {
    const list: SelectItem[] = [];
    Object.keys(ENUM).map(e => {
      if (!(parseInt(e, 10) >= 0)) {
        if (!enums.some(unselected=> unselected == ENUM[e])) {
          list.push({label: this.translate.instant(e), value: ENUM[e]});
        }
      }
    });
    list.sort(SelectService.sort);
    if (nullable) {
      list.unshift({label: this.translate.instant('SECINIZ'), value: null});
    }
    return list;
  }

  getNamedSync(query: string, func: Function, value?: number, nullable: boolean = true) {
    const list: SelectItem[] = [];
    let params = new HttpParams();
    params = params.append('name', query);
    if (value !== null && value !== undefined) {
      params = params.append('value', value.toString());
    }
    this.http.get<AppResponse>(`${this.BASE_PATH}/select/`, {params: params}).subscribe(res => {
      for (let i = 0; i < JSON.parse(JSON.stringify(res)).length; i++) {
        list.push({label: res[i].label, value: res[i].value});
      }
      list.sort(SelectService.sort);
      if (nullable) {
        list.unshift({label: this.translate.instant('SECINIZ'), value: null});
      }
      func.bind(this, list).call();
    });
  }

  getNamedSyncWithDetail(query: string, func: Function, value?: number, nullable: boolean = true) {
    const list: SelectItemDetail[] = [];
    let params = new HttpParams();
    params = params.append('name', query);
    if (value !== null && value !== undefined) {
      params = params.append('value', value.toString());
    }
    this.http.get<AppResponse>(`${this.BASE_PATH}/select/`, {params: params}).subscribe(res => {
      for (let i = 0; i < JSON.parse(JSON.stringify(res)).length; i++) {
        list.push({label: res[i].label, value: res[i].value, detailFieldDTOMap: res[i].detailFieldDTOMap});
      }
      list.sort(SelectService.sort);

      if (nullable) {
        list.unshift({label: this.translate.instant('SECINIZ'), value: null, detailFieldDTOMap: null});
      }
      func.bind(this, list).call();
    });
  }

  /*
   * Multiselect'den seçilen bir veya birden çok değerin listede tutulup back-end'te ilgili '/select/listValues' pathine(SelectController) list olarak gönderilebilmesi için yazılmıştır.
   * TLCLGVDFN-1835 - VFNET-CR-064
   * */
  getNamedSyncForListValues(query: string, func: Function, value?: number, nullable: boolean = true) {
    const list: SelectItemDetail[] = [];
    let params = new HttpParams();
    params = params.append('name', query);
    if (value !== null && value !== undefined) {
      params = params.append('value', value.toString());
    }
    this.http.get<AppResponse>(`${this.BASE_PATH}/select/listValues`, {params: params}).subscribe(res => {
      for (let i = 0; i < JSON.parse(JSON.stringify(res)).length; i++) {
        list.push({label: res[i].label, value: res[i].value, detailFieldDTOMap: res[i].detailFieldDTOMap});
      }
      list.sort(SelectService.sort);

      if (nullable) {
        list.unshift({label: this.translate.instant('SECINIZ'), value: null, detailFieldDTOMap: null});
      }
      func.bind(this, list).call();
    });
  }

  async getNamedAsync(query: string, nullable: boolean = true, value?: number) {
    let params = new HttpParams({fromObject: {'name': query}});
    if (value) {
      params = params.append('value', value.toString());
    }
    const res = <SelectItem[]> await this.http.get<SelectItem[]>(`${this.BASE_PATH}/select/`, {params: params}).toPromise();
    res.sort(SelectService.sort);
    if (nullable) {
      res.unshift({label: this.translate.instant('SECINIZ'), value: null});
    }
    return res;
  }
  get(query: string, value?: number, nullable: boolean = true): Observable<SelectItem[]> {

    let params = new HttpParams({fromObject: {'name': query}});
    // params = params.append('name', query);
    if (value) {
      params = params.append('value', value.toString());
    }
    return this.http.get<SelectItem[]>(`${this.BASE_PATH}/select/`, {params: params}).pipe(
      map(res => {
        res.sort(SelectService.sort);
        if (nullable) {
          res.unshift({label: this.translate.instant('SECINIZ'), value: null});
        }
        return res;
      })
    );
  }

  public getWithLabel(values: string[], nullable: boolean = true): SelectItem[] {
    const list: SelectItem[] = [];
    for (const value of values) {
      list.push({label: this.translate.instant(value), value: value});
    }
    list.sort(SelectService.sort);
    if (nullable) {
      list.unshift({label: this.translate.instant('SECINIZ'), value: null});
    }
    return list;
  }
}

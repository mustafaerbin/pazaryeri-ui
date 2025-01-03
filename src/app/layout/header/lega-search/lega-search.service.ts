import {Injectable} from "@angular/core";
import {AbstractService} from "../../../shared/config/abstract-service";
import {Observable} from "rxjs";
import {AppResponse} from "../../../shared/model/app-response";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LegaSearchService extends AbstractService {

  constructor(private http: HttpClient) {
    super();
  }

  getSearchBoxCriteria(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${this.BASE_PATH}/layout/toolbar/searchBoxCriteria`);
  }

  getDosyaTipiAndDosyaId(searchText: string, searchFrom: string): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${this.BASE_PATH}/layout/toolbar/dosyaGoruntule/${searchText}/${searchFrom}`);
  }

  getSearchHistory(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${this.BASE_PATH}/layout/search/history`);
  }
}

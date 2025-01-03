import {AbstractService} from '../../shared/config/abstract-service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppResponse} from '../../shared/model/app-response';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends AbstractService {

  constructor(private http: HttpClient) {
    super();
  }

  getMenu(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${this.BASE_PATH}/layout/menu`);
  }

  searchMenu(searchKeyword: string): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${this.BASE_PATH}/layout/searchMenu`, searchKeyword);
  }

  getMenuBookmarks(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${this.BASE_PATH}/bookmark-ng/menu`);
  }
}

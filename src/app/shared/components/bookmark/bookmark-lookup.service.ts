import {AppResponse} from '../../model/app-response';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractService} from '../../config/abstract-service';
import {Injectable} from '@angular/core';

@Injectable()
export class BookmarkLookupService extends AbstractService {

  constructor(private http: HttpClient) {
    super();
  }

  get(route: string): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${this.BASE_PATH}/bookmark-ng`, {params: {route: route}});
  }

  post(route: string): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${this.BASE_PATH}/bookmark-ng`, undefined, {params: {route: route}});
  }

  delete(route: string): Observable<AppResponse> {
    return this.http.delete<AppResponse>(`${this.BASE_PATH}/bookmark-ng`, {params: {route: route}});
  }
}

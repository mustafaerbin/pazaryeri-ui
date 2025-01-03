import {AbstractService} from '../config/abstract-service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppResponse} from '../model/app-response';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class InitService extends AbstractService {

  constructor(private http: HttpClient) {
    super();
  }

  get(viewId: string): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${this.BASE_PATH}/${viewId}`);
  }

  getByPathVariable(viewId: string, pathVariable: string): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${this.BASE_PATH}/${viewId}/${pathVariable}`);
  }
}

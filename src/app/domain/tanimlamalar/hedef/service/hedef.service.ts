import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hedef } from '../dto/hedef';
import { AppResponse } from '../../../../shared/model/app-response';
import { HedefSorguKriterleri } from '../dto/hedef-sorgu-kriterleri';
import { createRequestParams } from '../../../../shared/utils/request-utis';
import { QueryObject } from '../../../../shared/model/request.model';
import { AppConfig } from '../../../../shared/config/app-config';

@Injectable()
export class HedefService {

  private baseUrl: string = `${AppConfig.apiUrl}/hedefTanim`;

  constructor(private http: HttpClient) {
  }

  get(id: string): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${this.baseUrl}/${id}`);
  }

  getAll(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${this.baseUrl}/all`);
  }

  query(queryObject: QueryObject<HedefSorguKriterleri>): Observable<AppResponse> {
    const options = createRequestParams(queryObject);
    return this.http.get<AppResponse>(`${this.baseUrl}`, { params: options});
  }

  update(id: number, hedef: Hedef): Observable<AppResponse> {
    return this.http.put<AppResponse>(`${this.baseUrl}/${id}`, hedef);
  }

  create(hedef: Hedef): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${this.baseUrl}`, hedef);
  }

  delete(id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(`${this.baseUrl}/${id}`);
  }
}


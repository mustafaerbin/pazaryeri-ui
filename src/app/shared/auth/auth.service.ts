import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AbstractService} from '../config/abstract-service';
import {HttpClient} from '@angular/common/http';
import {AppResponse} from "../model/app-response";


@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractService {

  constructor(private http: HttpClient) {
    super();
  }

  isAuthenticated(authLink: string): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${this.BASE_PATH}/auth/grant`, authLink);
  }

  isAuthenticatedMulti(authLinks: string[]): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${this.BASE_PATH}/auth/grant/multi`, authLinks);
  }

  checkSession(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${this.BASE_PATH}/app/ping`);
  }
}

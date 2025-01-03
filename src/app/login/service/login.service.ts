import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import {AbstractService} from "../../shared/config/abstract-service";
import {AppResponse} from "../../shared/model/app-response";

@Injectable()
export class LoginService extends AbstractService {

  constructor(private http: HttpClient) {
    super();
  }

  info(): Observable<AppResponse> {
   // return this.http.get<AppResponse>(`${this.BASE_PATH}/login/info`);
   return new Observable((observer: Observer<any>) => {
     observer.next("ok");
     observer.complete();
   });
  }

}


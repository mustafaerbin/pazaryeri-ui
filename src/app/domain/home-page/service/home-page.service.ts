import {AbstractService} from "../../../shared/config/abstract-service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {AppResponse} from "../../../shared/model/app-response";

@Injectable()
export class HomePageService extends AbstractService {

  constructor(private http: HttpClient) {
    super();
  }

  getGorevList(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${this.BASE_PATH}/homepage/gorevlerim/get-gorev-list`);
  }

  getTotalCountByGorevList(): Observable<AppResponse> {
    //return this.http.get<AppResponse>(`${this.BASE_PATH}/homepage/gorevlerim/get-total-count-gorev-list`);
    return null
  }
}

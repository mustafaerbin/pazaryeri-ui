import {AbstractService} from '../../../../shared/config/abstract-service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {AppResponse} from '../../../../shared/model/app-response';

@Injectable()
export class LayoutToolbarService extends AbstractService {

  constructor(private http: HttpClient) {
    super();
  }
  getToolbarData(): Observable<AppResponse> {
    //return this.http.get<AppResponse>(`${this.BASE_PATH}/layout/toolbar/getToolbarData`);
    //fixme fake data düzeltilecek
    return of({
      status: 200, // HTTP status kodu veya kendi belirlediğiniz bir status kodu
      errorMessage: "",
      data: {
        isPasswordExpired: false,
        mainPageUrl: "/",
        logoUrl: "./assets/images/innova-logo.png",
        duyuruSayisi: 10,
        mesajSayisi: 19,
        urlForFAQ: "null",
        helpURL: "null",
        userManualURL: "null",
        sirketWebAdresi: "https://www.innova.com.tr/home",
        sirketLogoUrl: "./assets/layout/images/logo-dark.png",
        sirketThemeBg: "#e0d5eb"
      }
    });
  }
}

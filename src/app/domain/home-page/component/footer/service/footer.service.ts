import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { AppResponse } from '../../../../../shared/model/app-response';
import { AbstractService } from '../../../../../shared/config/abstract-service';
import { of } from 'rxjs';

@Injectable()
export class FooterService extends AbstractService {

  constructor(private http: HttpClient) {
    super();
  }

  getYenilikler(): Observable<AppResponse> {
    //return this.http.get<AppResponse>(`${this.BASE_PATH}/homepage/footer/get-yenilikler`);
    return of({
      status: 200,
      errorMessage: "",
      data: [
        {
          info: "Info",
          label: "Test",
          title: "0.0.2",
          value: "https://www.innova.com.tr/home"
        },
        {
          info: "Info2",
          label: "Test2",
          title: "0.0.2",
          value: "https://www.innova.com.tr/home"
        }
      ]
    });
  }

  getAnasayfaUyari(): Observable<AppResponse> {
    //return this.http.get<AppResponse>(`${this.BASE_PATH}/homepage/footer/uyari`);
    return of({
      status: 200,
      errorMessage: "",
      data: "Innova.com.tr/home"
    })
  }

  getDestekHattiBilgileri(): Observable<AppResponse> {
    //return this.http.get<AppResponse>(`${this.BASE_PATH}/homepage/footer/destekHattiBilgileri`);
    return of({
      status: 200,
      errorMessage: "",
      data: [
        {
          deger: "444 14 15",
          tur: "t"
        }
      ]
    })
  }
}

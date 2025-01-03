import {AbstractService} from "../../../../shared/config/abstract-service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable, Observer, of } from 'rxjs';
import {AppResponse} from "../../../../shared/model/app-response";

@Injectable()
export class LayoutInfoPanelService extends AbstractService {

  constructor(private http: HttpClient) {
    super();
  }

  getInfoPanelData(): Observable<AppResponse> {
    //return this.http.get<AppResponse>(`${this.BASE_PATH}/layout/infoPanel/getInfoPanelData`);
    //fixme fake data düzeltilecek
    return of({
      status: 200, // HTTP status kodu veya kendi belirlediğiniz bir status kodu
      errorMessage: "",
      data: {
        isSupervisor: false,
        canSupervise: null,
        renderSirketLogo: './assets/images/logo.png',
        serverDate: null,
        serverNameOrInstanceNo: null,
        datasourceSchemaName: null,
        applicationVersion: '0.0.1/Innova',
        isChangePasswordActive: null,
        passwordChangeLink: "/auth/pw-change-password",
        userCode: "username",
        userDisplayName: "Ad Soyad",
        supervisorDisplayName: "Innova Supervisor",
        supervisorUsername: "Innova Supervisor",
        userMonogram: "TEST",
        isIDMDisabled: null,
        logoutLink: null,
        serverStyle: ""
      }
    });
  }
}

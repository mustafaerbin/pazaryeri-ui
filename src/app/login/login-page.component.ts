import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractComponent} from "../shared/components/abstract-component";
import {AppStore} from "../shared/utils/app.store";
import {environment} from "../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {LoginService} from "./service/login.service";



@Component({
  templateUrl: "./login.html",
  styleUrls: ['./login-page.component.css'],
  selector: 'app-login',
  providers: [LoginService]
})
export class LoginPageComponent extends AbstractComponent implements OnInit {

  @ViewChild('f', { static: true }) f;

  valCheck: string[] = ['remember'];

  password!: string;

  // @ts-ignore
  versiyon = environment.version;
  cause;
  count = 0;
  captchaUrl = `/icra/spring/auth/captcha#${this.count}`;
  errorMessage;
  renderCaptcha = false;
  buttonClick = false;
  sirketBilgileriList;

  constructor(private route: ActivatedRoute,
              private service: LoginService,
              appStore: AppStore) {
    super(appStore);
  }

  ngOnInit(): void {

    const username = sessionStorage.getItem('username');
    if (username !== null) {
      this.f.nativeElement[0].value = username;
    }
    const infos = sessionStorage.getItem('infos');
    if (infos !== null) {
      this.sirketBilgileriList = JSON.parse(infos);
    }
    else {
      this.subscribeToResponseBase(this.service.info(), this.init);
    }
    this.cause = this.route.snapshot.queryParams["error"];
    this.renderCaptcha = this.route.snapshot.queryParams["renderCaptcha"];
  }

  submit() {
    sessionStorage.setItem('username', this.f.nativeElement[0].value);
    this.buttonClick = true;
    this.f.nativeElement.submit();
  }

  refreshCaptcha() {
    this.count = this.count + 1;
    this.captchaUrl = `/icra/spring/auth/captcha#${this.count}`;
  }

  private init(data: any[]) {
    this.sirketBilgileriList = data;
    sessionStorage.setItem('infos', JSON.stringify(this.sirketBilgileriList));
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {AppStore} from "../../../shared/utils/app.store";
import {LayoutInfoPanelService} from "./service/layout-info-panel.service";
import {InfoPanelDto} from "./dto/info-panel-dto";
import {AbstractGoruntuleComponent} from "../../../shared/components/abstract-goruntule-component";

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent extends AbstractGoruntuleComponent implements OnInit {

  // By default, all methods and properties are public
  infoPanelData: InfoPanelDto;
  loading: boolean = false;

  sirketTemaBg: string;
  textColor: string;

  constructor(appStore: AppStore,
              private infoPanelService: LayoutInfoPanelService) {
    super(appStore);
  }

  ngOnInit(): void {
    this.loadData();
    this.appStore.sirketTemaUpdateEvent.subscribe((color) => {
      this.sirketTemaBg = `linear-gradient(180deg, ${color} 0%, ${color}FF 100%)`;
      this.textColor = this.getTextColor(color);
    });
  }

  private loadData() {
    //this.subscribeToResponseBase(this.infoPanelService.getInfoPanelData(), this.getDataSuccess);
    this.getDataSuccess({
      isSupervisor: true,
      canSupervise: null,
      renderSirketLogo: true,
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
    })
  }

  private getDataSuccess(data: InfoPanelDto) {
    this.infoPanelData = data
  }

  private getRGB(c): number {
    return parseInt(c, 16) || c
  }

  private getsRGB(c): number {
    return this.getRGB(c) / 255 <= 0.03928
      ? this.getRGB(c) / 255 / 12.92
      : Math.pow((this.getRGB(c) / 255 + 0.055) / 1.055, 2.4)
  }

  private getLuminance(hexColor) {
    return (
      0.2126 * this.getsRGB(hexColor.substr(1, 2)) +
      0.7152 * this.getsRGB(hexColor.substr(3, 2)) +
      0.0722 * this.getsRGB(hexColor.substr(-2))
    )
  }

  private getContrast(f, b) {
    const L1 = this.getLuminance(f)
    const L2 = this.getLuminance(b)
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
  }

  private getTextColor(bgColor) {
    const whiteContrast = this.getContrast(bgColor, '#ffffff')
    const blackContrast = this.getContrast(bgColor, '#000000')

    return whiteContrast > blackContrast ? '#c9c9c9' : '#040404'
  }
}

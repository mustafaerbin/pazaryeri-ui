export class InfoPanelDto {
  isSupervisor: boolean;
  canSupervise: boolean;
  renderSirketLogo: boolean;
  serverDate: Date;
  serverNameOrInstanceNo: string;
  datasourceSchemaName: string;
  applicationVersion: string;
  isChangePasswordActive: boolean;
  passwordChangeLink: string;
  userCode: string;
  userDisplayName: string;
  supervisorDisplayName: string;
  supervisorUsername: string;
  userMonogram: string;
  isIDMDisabled: boolean;
  logoutLink: string;
  serverStyle: string;
}

export interface ConfirmData {
  header?: string;
  message?: string;
  icon?: string;
  acceptFunction?: Function;
  rejectFunction?: Function;
  acceptSummary?: string;
  rejectSummary?: string;
  acceptDetail?: string;
  rejectDetail?: string;
  type?: ConfirmType;
}

export enum ConfirmType {
  ONAY, SIL, GUNCELLE, KAYDET,RED
}


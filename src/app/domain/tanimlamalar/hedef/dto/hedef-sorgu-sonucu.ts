import { SorguSonucu } from '../../../../shared/components/datatable/sorgu-sonucu';

export interface HedefSorguSonucu extends SorguSonucu {
  adi: string;
  aciklama: string;
  durum: number;
}

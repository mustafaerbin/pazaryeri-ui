import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../../../../shared/components/abstract-component';
import { AppStore } from '../../../../shared/utils/app.store';
import { FooterService } from './service/footer.service';
import { SistemParametresiView } from './model/sistem-parametresi-view';

@Component({
  selector: 'app-home-page-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent extends AbstractComponent implements OnInit {

  yenilikler: { label: string, value: string }[];
  anasayfaUyari: string;
  destekHattiBilgileri: SistemParametresiView[];

  constructor(
    appStore: AppStore,
    private readonly service: FooterService) {
    super(appStore);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.subscribeToResponseBase(this.service.getYenilikler(), (data: { label: string; value: string; }[]) => {
      this.yenilikler = data;
    });

    this.subscribeToResponseBase(this.service.getAnasayfaUyari(), (data: string) => this.anasayfaUyari = data);
    this.subscribeToResponseBase(this.service.getDestekHattiBilgileri(), (data: SistemParametresiView[]) => this.destekHattiBilgileri = data);
  }
}

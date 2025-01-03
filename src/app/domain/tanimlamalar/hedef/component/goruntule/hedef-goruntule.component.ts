import {Component, OnInit} from '@angular/core';
import { AbstractGoruntuleComponent } from '../../../../../shared/components/abstract-goruntule-component';
import { Dil, Durum } from '../../../../../shared/utils/constants';
import { Hedef } from '../../dto/hedef';
import { AppStore } from '../../../../../shared/utils/app.store';
import { ActivatedRoute } from '@angular/router';


@Component({
  templateUrl: './hedef-goruntule.component.html',
})

export class HedefGoruntuleComponent extends AbstractGoruntuleComponent implements OnInit {

  entity: Hedef;

  enums: any = {Durum: Durum, Dil: Dil};

  constructor(appStore: AppStore,
              private route: ActivatedRoute) {
    super(appStore);
  }

  ngOnInit(): void {
    this.appStore.setData('hedefGeriDon', true);
    this.route.data.subscribe(data => {
      this.entity = data['entity'];
    });
  }

  goBack(): void {
    this.appStore.clearMessage();
    this.appStore.location.back();
  }
}

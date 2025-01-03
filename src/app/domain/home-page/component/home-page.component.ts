import {Component, OnInit} from '@angular/core';
import {AppStore} from '../../../shared/utils/app.store';
import {AbstractComponent} from '../../../shared/components/abstract-component';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent extends AbstractComponent implements OnInit {

  constructor(appStore: AppStore) {
    super(appStore);
  }

  ngOnInit() {
  }
}

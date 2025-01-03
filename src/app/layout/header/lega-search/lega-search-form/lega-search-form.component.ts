import {Component, OnInit} from '@angular/core';
import {AbstractBaseComponent} from '../../../../shared/components/abstract-base-component';
import {AppStore} from '../../../../shared/utils/app.store';

@Component({
  selector: 'app-lega-search-form',
  templateUrl: './lega-search-form.component.html',
  styleUrls: ['./lega-search-form.component.css']
})
export class LegaSearchFormComponent extends AbstractBaseComponent implements OnInit {

  constructor(appStore: AppStore) {
    super(appStore);
  }


  ngOnInit() {
  }

}

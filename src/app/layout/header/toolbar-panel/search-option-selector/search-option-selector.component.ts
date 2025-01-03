import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {SearchBoxDto} from '../../lega-search/search-box-dto';
import {AbstractBaseComponent} from '../../../../shared/components/abstract-base-component';
import {AppStore} from '../../../../shared/utils/app.store';
import {LegaSearchService} from '../../lega-search/lega-search.service';

@Component({
  selector: 'app-search-option-selector',
  templateUrl: './search-option-selector.component.html',
  styleUrls: ['./search-option-selector.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchOptionSelectorComponent extends AbstractBaseComponent implements OnInit {

  searchOptions: SearchBoxDto[] = [];

  @Output() searchOptionSelected: EventEmitter<SearchBoxDto> = new EventEmitter<SearchBoxDto>();
  selectedSearchOption: SearchBoxDto;

  constructor(appStore: AppStore,
              private searchService: LegaSearchService) {
    super(appStore);
  }

  searchOptionClick($event: MouseEvent, item: any) {
    this.selectedSearchOption = item;
    this.searchOptionSelected.emit(this.selectedSearchOption);

    sessionStorage.setItem('keyword', this.selectedSearchOption.searchOption);
  }

  ngOnInit() {
    // this.subscribeToResponseBase(this.searchService.getSearchBoxCriteria(), (data) => {
    //   this.searchOptions = [...data];
    //
    //   let sOption: SearchBoxDto;
    //   if (sessionStorage.getItem('keyword')) {
    //     sOption = this.searchOptions.filter((s) => s.searchOption === sessionStorage.getItem('keyword')).shift();
    //     if (sOption === undefined) {
    //       sOption = this.searchOptions.shift();
    //     }
    //   } else {
    //     sOption = this.searchOptions.shift();
    //   }
    //
    //   this.selectedSearchOption = sOption;
    //   this.searchOptionSelected.emit(this.selectedSearchOption);
    //   sessionStorage.setItem('keyword', this.selectedSearchOption.searchOption);
    // });
  }
}

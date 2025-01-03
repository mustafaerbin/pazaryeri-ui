import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AbstractBaseComponent} from '../../../shared/components/abstract-base-component';
import {AppStore} from '../../../shared/utils/app.store';
import {SearchBoxDto, SearchSuggestion} from './search-box-dto';
import {LegaSearchService} from './lega-search.service';
import {Router} from '@angular/router';
import {InitService} from '../../../shared/resolvers/init-service';
import {MenuItem} from '../../menu/menu';
import {MenuService} from '../../menu/menu.service';
import {FormUtil} from '../../../shared/utils/form-util';
import {Observable} from 'rxjs';
import {TabViewChangeEvent} from 'primeng/tabview';

@Component({
  selector: 'app-lega-search',
  templateUrl: './lega-search.component.html',
  styleUrls: ['./lega-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LegaSearchComponent extends AbstractBaseComponent implements OnInit, OnChanges {

  @Input() refreshHistory: Observable<boolean>;
  @Input() minLength: number = 3;
  @Input() visible: boolean = false;

  @Output() suggestionSelected: EventEmitter<SearchSuggestion> = new EventEmitter<SearchSuggestion>();
  @Output() searchEnd: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('searchInput', {static: true}) searchInput?: ElementRef<HTMLInputElement>;

  searchOptions: SearchBoxDto[] = [];
  selectedOption: SearchBoxDto;
  searchInputPlaceholder?: string;
  searchSuggestions: SearchSuggestion[] = [];
  searchingSuggestions: boolean = false;
  showMoreLimit = 6;
  showMoreButton: boolean = true;
  activeTab;

  searchHistory: SearchSuggestion[] = [];

  loading: boolean = false;

  constructor(appStore: AppStore,
              private router: Router,
              private service: LegaSearchService,
              public initService: InitService,
              private menuService: MenuService) {
    super(appStore);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    // if(changes['visible']) {
    //
    //   this.searchOptions = [];
    //   this.subscribeToResponseBase(this.service.getSearchBoxCriteria(), (data) => {
    //     this.searchOptions = [...data];
    //     this.searchInputPlaceholder = this.searchOptions[0].searchLabel + ' ile ara';
    //     this.selectedOption = this.searchOptions[0];
    //   });
    //
    //   this.searchHistory = [];
    //   this.subscribeToResponseBase(this.service.getSearchHistory(), (data) => {
    //     this.searchHistory = [...data];
    //   });
    //
    //
    //   this.activeTab = 0;
    //   this.searchInput.nativeElement.value = '';
    //   this.searchingSuggestions = false;
    // }

  }

  public searchCriteria(keyword: string) {
    this.appStore.setData('option', this.selectedOption.searchOption);
    this.appStore.setData('keyword', keyword);
    this.searchEnd.emit();
  }

  public changeTab(event: TabViewChangeEvent) {

  }

  selectSearchOption(val: SearchBoxDto) {
    this.selectedOption = val;
    this.searchInputPlaceholder = this.searchOptions.filter(v => v.searchOption === val.searchOption).shift().searchLabel + ' ile ara';
  }

  onSuggestionClick(suggestion: SearchSuggestion) {
    // this.router.navigateByUrl(suggestion.routerLink);
    this.suggestionSelected.emit(suggestion);
  }

  onHistoryClick(suggestion: SearchSuggestion) {
    this.appStore.setData('option', 'dosyano');
    this.appStore.setData('keyword', suggestion.text);
    this.searchEnd.emit();
  }

  public inputChanged(event: any) {
    if (event.target.value.length < this.minLength) {
      this.loading = false;
      this.searchSuggestions = [];
      this.searchingSuggestions = false;
      return;
    }

    //this.loading = true;
    this.searchingSuggestions = true;
    this.subscribeToResponseBase(this.menuService.searchMenu(event.target.value), this.getMenuDataSuccess);
  }

  private getMenuDataSuccess(menuItems: MenuItem[]) {
    this.searchSuggestions = menuItems.map(
      (menuItem: MenuItem) => {
        let translatedText: string = '';

        if (!FormUtil.isEmpty(menuItem.shortPath[0])) {
          translatedText = this.appStore.translate.instant(menuItem.shortPath[0]);
        }

        if (!FormUtil.isEmpty(menuItem.shortPath[1])) {
          translatedText += ' -> ' + this.appStore.translate.instant(menuItem.shortPath[1]);
        }

        return {
          id: menuItem.id,
          text: this.appStore.translate.instant(menuItem.labelKey),
          hint: translatedText,
          routerLink: menuItem.link,
        };
    });

    this.showMoreLimit = 6;
    this.showMoreButton = true;

    this.loading = false;
  }

  public showAllItems() {
    this.showMoreLimit = Number.MAX_SAFE_INTEGER;
    this.showMoreButton = false;
  }
}

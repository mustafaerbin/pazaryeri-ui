import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractBaseComponent} from '../../../shared/components/abstract-base-component';
import {AppStore} from '../../../shared/utils/app.store';
import {SearchSuggestion} from '../../header/lega-search/search-box-dto';
import {MenuService} from '../menu.service';
import {MenuItem} from '../menu';
import {FormUtil} from '../../../shared/utils/form-util';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-menu-page-search',
  templateUrl: './menu-page-search.component.html',
  styleUrls: ['./menu-page-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuPageSearchComponent extends AbstractBaseComponent implements OnInit {

  @Input() minLength: number = 3;
  @ViewChild('pageInput') pageInput: ElementRef<HTMLInputElement>;
  @Input() clearEvent: Observable<void>;

  searchSuggestions: SearchSuggestion[] = [];
  searchingSuggestions: boolean = false;

  showMoreLimit = 10;
  showMoreButton: boolean = true;

  loading: boolean = false;

  constructor(appStore: AppStore,
              private router: Router,
              private renderer: Renderer2,
              private menuService: MenuService) {
    super(appStore);
  }

  ngOnInit() {
    // this.clearEvent.subscribe(() => {
      setTimeout(() => {
      this.searchingSuggestions = false;
      this.searchSuggestions = [];
        this.pageInput.nativeElement.value = '';
        this.pageInput.nativeElement.focus();
      }, 1000);
    // });
  }

  public inputClicked(event: any) {
    this.pageInput.nativeElement.select();
  }

  public inputChanged(event: any) {
    if (event.target.value.length < this.minLength) {
      this.loading = false;
      this.searchSuggestions = [];
      this.searchingSuggestions = false;
      return;
    }

    this.loading = true;
    this.searchingSuggestions = true;
    //this.subscribeToResponseBase(this.menuService.searchMenu(event.target.value), this.getMenuDataSuccess);
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

  onSuggestionClick(suggestion: SearchSuggestion) {
    this.router.navigateByUrl(suggestion.routerLink);
  }

  public showAllItems() {
    this.showMoreLimit = Number.MAX_SAFE_INTEGER;
    this.showMoreButton = false;
  }
}

import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractBaseComponent} from "../../../shared/components/abstract-base-component";
import {AppStore} from "../../../shared/utils/app.store";
import {MenuService} from "../menu.service";
import {BehaviorSubject, Observable} from "rxjs";
import {MenuItem} from "../menu";

@Component({
  selector: 'app-menu-bookmark',
  templateUrl: './menu-bookmark.component.html',
  styleUrls: ['./menu-bookmark.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuBookmarkComponent extends AbstractBaseComponent implements OnInit {

  bookmarkModel: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);
  loading: boolean = true;

  @Input() refreshEvent: Observable<boolean>;

  constructor(appStore: AppStore,
              private menuService: MenuService) {
    super(appStore);
  }

  ngOnInit() {

    this.prepareShortcuts();

    this.refreshEvent.subscribe(() => {
      //this.loading = true;
      this.refreshShortcuts();
    });
  }

  private prepareShortcuts() {
   // this.subscribeToResponseBase(this.menuService.getMenuBookmarks(), this.menuBookmarkSuccess);

  }

  private refreshShortcuts() {
   // / this.subscribeToResponseBase(this.menuService.getMenuBookmarks(), this.menuBookmarkSuccess);
  }

  private menuBookmarkSuccess(data: MenuItem[]) {
    this.bookmarkModel.next(data);
    this.loading = false;
  }
}

import {Component, OnInit} from '@angular/core';
import {AbstractBaseComponent} from '../abstract-base-component';
import {AppStore} from '../../utils/app.store';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BookmarkLookupService} from './bookmark-lookup.service';
import {Observable} from 'rxjs';
import {filter, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  providers: [BookmarkLookupService]
})
export class BookmarkComponent extends AbstractBaseComponent implements OnInit {

  private route: string;
  loading: boolean = true;
  markable: boolean = false;
  favorite: boolean = false;

  constructor(appStore: AppStore,
              private bookmarkService: BookmarkLookupService,
              private router: Router) {
    super(appStore);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd), startWith(this.router))
      .subscribe((event: NavigationEnd) => {
        this.loading = true;

        this.route = this.router.url;
        if (!this.route) {
          this.clearBookmark();
          return;
        }

        this.subscribeToResponseBase(this.bookmarkService.get(this.route), this.handleSuccess, this.clearBookmark);


      });
  }

  private handleSuccess(data) {
    if (data) {
      this.markable = data['markable'];
      this.favorite = data['favorite'];
    } else {
      this.clearBookmark();
    }
    this.loading = false;
  }

  private clearBookmark() {
    this.markable = false;
    this.favorite = false;
  }

  handleClick() {
    this.loading = true;
    let observable: Observable<any>;
    if (this.favorite) {
      observable = this.bookmarkService.delete(this.route);
    } else {
      observable = this.bookmarkService.post(this.route);
    }

    this.subscribeToResponse(observable, this.handleSuccess, this.clearBookmark);
  }
}

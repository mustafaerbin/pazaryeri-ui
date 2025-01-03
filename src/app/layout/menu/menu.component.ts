import {
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input,
  NgZone,
  OnInit, Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MenuService} from './menu.service';
import {AbstractBaseComponent} from '../../shared/components/abstract-base-component';
import {AppStore} from '../../shared/utils/app.store';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {MenuItem, MenuModel} from './menu';
import {LayoutMainService} from '../layout-main/layout-main.service';
import {DomHandler} from 'primeng/dom';
import menuData from './menu.json'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    MenuService
  ]
})
export class MenuComponent extends AbstractBaseComponent implements OnInit {

  menuModel: BehaviorSubject<MenuModel[]> = new BehaviorSubject<MenuModel[]>([]);
  @Input() style: any;
  @Input() styleClass = '';
  public data: MenuModel[] = menuData;
  loading = true;
  documentClickListener: any;
  opened = true;
  openedBookmarks = true;
  openedSearch = true;
  overlayOpened = true

  @Output() bookmarkRefreshEvent = new EventEmitter<boolean>();
  @Output() openedSearchEvent: EventEmitter<void> = new EventEmitter<void>();

  activeRoot: any;

  @ViewChild('menuOverlay', {static: false}) menuOverlay?: ElementRef;

  constructor(appStore: AppStore,
              private service: MenuService,
              private layoutMainService: LayoutMainService,
              public el: ElementRef,
              private cd: ChangeDetectorRef,
              private router: Router,
              private ngZone: NgZone) {
    super(appStore);
  }

  ngOnInit(): void {
    this.menuSuccess(this.data)
    // this.ngZone.runOutsideAngular(() => {
    //  this.subscribeToResponse(this.service.getMenu(), this.menuSuccess);
    // });
    this.router.events.subscribe((_) => {
      this.activeRoot = null;
      this.opened = false;
      this.unbindDocumentClickListener();
      this.layoutMainService.menuOverlayHidden = true;
    });
  }

  onRootClick($event: MouseEvent, el: ElementRef, rootId: string) {
    if (!this.opened) {
      this.bindDocumentClickListener();
      this.activeRoot = rootId;

      this.displayMenuOverlay(rootId, 'onRootClick');
      this.alignArrow($event);
      this.openedBookmarks = this.activeRoot === 'bookmark';
      this.openedSearch = this.activeRoot === 'search';

      if (this.openedBookmarks) {
        this.bookmarkRefreshEvent.emit(true);
      }

      if (this.openedSearch) {
        this.openedSearchEvent.emit();
      }

      this.layoutMainService.menuOverlayHidden = this.opened;
      this.opened = !this.opened;
    } else {
      this.displayMenuOverlay(rootId, 'onRootClick');
      this.unbindDocumentClickListener();
      this.activeRoot = rootId;
      //this.layoutMainService.menuOverlayHidden = this.opened;
      //this.opened = !this.opened;
    }
  }

  onRootMouseEnter($event: MouseEvent, el: ElementRef, rootId: string) {
    if (this.opened) {
      //this.unbindDocumentClickListener();
      //this.activeRoot = null;
      //this.layoutMainService.menuOverlayHidden = this.opened;
      //this.opened = !this.opened;

      //this.activeRoot = rootId;
      this.displayMenuOverlay(rootId, 'onRootMouseEnter');
      this.openedBookmarks = this.activeRoot === 'bookmark';
      this.openedSearch = this.activeRoot === 'search';

      if (this.openedBookmarks) {
        this.bookmarkRefreshEvent.emit(true);
      }
      if (this.openedSearch) {
        this.openedSearchEvent.emit();
      }
      //this.alignArrow($event);
    } else {
      this.displayMenuOverlay(rootId, 'onRootMouseEnter');
      $event.preventDefault();
    }
  }


  private displayMenuOverlay(rootId: string, type: string) {
    const menuModelValue = this.menuModel.value; // BehaviorSubject içindeki değeri al
    const menuModelRoot = menuModelValue.find(item => item.id === rootId);
    if (menuModelRoot && menuModelRoot.items && menuModelRoot.items.length === 0) {
      this.layoutMainService.menuOverlayHidden = true
      if(type === 'onRootClick'){
        this.navigate(menuModelRoot.link)
      }
    } else {
      this.layoutMainService.menuOverlayHidden = false
    }
  }

  private menuSuccess(data: any) {
    // this.menuModel.next([
    //   {
    //     id: 'search',
    //     labelKey: this.appStore.translate.instant('menu.ara'),
    //     iconClass: 'menu-root-item-icon menu-search',
    //     renderable: false,
    //   },
    //   {
    //     id: 'bookmark',
    //     labelKey: this.appStore.translate.instant('menu.kisayollar'),
    //     iconClass: 'menu-root-item-icon menu-bookmark',
    //     renderable: false,
    //   },
    //   {
    //     separator: true,
    //   },
    // ]);
    const curr = this.menuModel.value;
    const nex = curr.concat(data);
    this.menuModel.next(nex);
    this.loading = false;
  }

  public navigate(item: MenuItem) {
    this.router.navigateByUrl(item.link, {
      state: {
        freshRoute: true
      }
    });
  }

  calcGridCols(cols?: number): string {
    return 'w-max grid grid-cols-' + ((cols) ? cols : '3');
    //return 'w-max grid grid-rows-max'; // grid-cols-" + ((cols) ? cols : "3");
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = (event: MouseEvent) => {
        if (this.el && !this.el.nativeElement.contains(event.target)) {
          this.opened = false;
          this.activeRoot = undefined;
          this.openedBookmarks = false;
          this.openedSearch = false;
          this.layoutMainService.menuOverlayHidden = true;
          this.unbindDocumentClickListener();
          this.cd.markForCheck();
        }
      };

      document.addEventListener('click', this.documentClickListener);
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);
      this.documentClickListener = undefined;
    }
  }

  private alignArrow($event: MouseEvent) {
    if (this.activeRoot) {
      const rootEl = $event.currentTarget || $event.target;

      DomHandler.addClass(this.menuOverlay?.nativeElement, 'active');
      const overlayEl = this.menuOverlay?.nativeElement; //;.querySelector(".menu-item-content.active");

      DomHandler.relativePosition(rootEl, overlayEl);

      const rootOffset = DomHandler.getOffset(rootEl);
      const overlayOffset = DomHandler.getOffset(overlayEl);

      const arrowTop = rootOffset.top - overlayOffset.top;
      this.menuOverlay?.nativeElement.style.setProperty(
        '--sidebar-menu-content-arrow-top',
        `${arrowTop}px`
      );
      // this.renderer.add(this.menuOverlay?.nativeElement, '--contentArrowTop', `${arrowTop}px`);
    }
  }
}

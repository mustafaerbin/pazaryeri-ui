import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppStore } from '../../../shared/utils/app.store';
import { AbstractGoruntuleComponent } from '../../../shared/components/abstract-goruntule-component';
import { LayoutToolbarDto } from './dto/layout-toolbar-dto';
import { LayoutToolbarService } from './service/layout-toolbar.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { InfoPanelDto } from '../info-panel/dto/info-panel-dto';
import { LayoutInfoPanelService } from '../info-panel/service/layout-info-panel.service';
import { MenuService } from '../../menu/menu.service';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { AngularDeviceInformationService } from 'angular-device-information';
import { SearchBoxDto, SearchSuggestion } from '../lega-search/search-box-dto';
import { LegaSearchService } from '../lega-search/lega-search.service';
import { OverlayPanel } from 'primeng/overlaypanel';


@Component({
  selector: 'app-toolbar-panel',
  templateUrl: './toolbar-panel.component.html',
  styleUrls: ['./toolbar-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarPanelComponent extends AbstractGoruntuleComponent implements OnInit, OnDestroy {

  loading: boolean = true;
  toolbarData?: LayoutToolbarDto;
  infoPanelData?: InfoPanelDto;
  avatarMenuModel?: MenuItem[] = [];
  searchButtonBadge?: string;
  searchDialogVisible: boolean = false;
  shortcutListener;
  shortcutEvent: string;
  searchOption: string;
  sirketTemaBgGradient: string;

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
  @ViewChild('searchHistoryOverlay') searchHistoryOverlay: OverlayPanel;

  // Search Menu
  menuItemList: MenuItem[];

  searchHistory: SearchSuggestion[] = [];
  searchHistoryLoading: boolean = false;

  constructor(appStore: AppStore,
              private router: Router,
              private formBuilder: FormBuilder,
              private renderer: Renderer2,
              private deviceInformationService: AngularDeviceInformationService,
              private infoPanelService: LayoutInfoPanelService,
              private searchService: LegaSearchService,
              private toolbarService: LayoutToolbarService,
              private menuService: MenuService) {

    super(appStore);
  }

  ngOnInit(): void {

    if (this.deviceInformationService.getDeviceInfo().os.includes('Mac')) {
      this.searchButtonBadge = '\u2325 + K';
      this.shortcutEvent = 'keydown.Alt.k';

    } else {
      this.searchButtonBadge = 'ALT + K';
      this.shortcutEvent = 'keydown.Alt.k';
    }

    this.shortcutListener = this.renderer.listen(document, this.shortcutEvent, (e: KeyboardEvent) => {
      this.showSearchDialog(e);
      e.preventDefault();
    });

    this.infoPanelData = {
      isSupervisor: true,
      canSupervise: null,
      renderSirketLogo: true,
      serverDate: null,
      serverNameOrInstanceNo: null,
      datasourceSchemaName: null,
      applicationVersion: '0.0.1/Innova',
      isChangePasswordActive: null,
      passwordChangeLink: "/auth/pw-change-password",
      userCode: "username",
      userDisplayName: "Ad Soyad",
      supervisorDisplayName: "Innova Supervisor",
      supervisorUsername: "Innova Supervisor",
      userMonogram: "TEST",
      isIDMDisabled: null,
      logoutLink: null,
      serverStyle: ""
    }
    this.buildAvatarMenu();

    //todo daha sonra buradan alınacak
    this.subscribeToResponseBase(this.toolbarService.getToolbarData(), (data: LayoutToolbarDto) => {
      this.toolbarData = data;
      this.appStore.sirketTemaUpdateEvent.emit(this.toolbarData.sirketThemeBg);
    });
    this.subscribeToResponseBase(this.infoPanelService.getInfoPanelData(), (data: InfoPanelDto) => {
      this.infoPanelData = data;
      //this.buildAvatarMenu(); todo daha sonrası için açılacak
    });

    this.appStore.sirketTemaUpdateEvent.subscribe((color: string) => {
        this.updateSirketThemeBg(color);
    });

    this.loading = false;
  }

  updateSirketThemeBg(themeBg: string) {
    this.sirketTemaBgGradient = `linear-gradient(180deg, ${themeBg}40 0%, transparent 10%)`;
  }

  ngOnDestroy() {
    this.shortcutListener = null;
  }

  private buildAvatarMenu() {

    this.avatarMenuModel.push(
      {
        label: this.appStore.translate.instant('link.label.oturumu.kapat'),
        icon: 'pi pi-power-off',
        command : this.navigateLogout.bind(this),
        id : 'oturumuKapat'
      });
  }

  public navigateLogout(event: MenuItemCommandEvent) {
    window.location.href = this.infoPanelData.logoutLink;
  }

  public showSearchDialog(e: Event) {
    this.searchDialogVisible = true;
  }

  public showHistoryList(e: Event) {
    this.searchHistoryLoading = true;
    this.searchHistory = [];
    this.subscribeToResponseBase(this.searchService.getSearchHistory(), (data) => {
      this.searchHistory = [...data];
      this.searchHistoryLoading = false;
    });
  }


  private getMenuDataSuccess(menuData: MenuItem[]) {
    this.menuItemList = menuData;
  }


  public search(event: any) {
    this.subscribeToResponseBase(this.menuService.searchMenu(event.query), this.getMenuDataSuccess);
  }

  public avatarBackground(str: string = '') {
    const stringUniqueHash = [...str].reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return `hsl(${stringUniqueHash % 360}, 95%, 35%)`;
  }

  searchEnd() {
    this.router.navigateByUrl('/quickSearch');
    this.searchDialogVisible = false;
  }

  suggestionSelected(suggestion: SearchSuggestion) {
    this.router.navigateByUrl(suggestion.routerLink);
    this.searchDialogVisible = false;
  }

  protected startFN() {
   // this.appStore.loading = true;
  }

  protected endFN() {
    this.appStore.loading = false;
  }

  public avatarMenuItemClick(event: any, item: MenuItem) {

    if(item.command){
      item.command({originalEvent: event, item: item});
    }

    if(item.routerLink) {
      this.router.navigateByUrl(item.routerLink);
    }
  }

  onSearchDone(event: Event) {
    this.appStore.setData('option', this.searchOption);
    this.appStore.setData('keyword', this.searchInput.nativeElement.value.trim());
    this.searchInput.nativeElement.value='';
    this.router.navigateByUrl('/quickSearch');
  }

  onSearchPaste(event: ClipboardEvent) {
    this.appStore.setData('option', this.searchOption);
    this.appStore.setData('keyword', event.clipboardData.getData('text').trim());
    setTimeout(() => {
      this.searchInput.nativeElement.value='';
    }, 100)
    this.router.navigateByUrl('/quickSearch');
  }

  onSearchInputFocus(event: FocusEvent) {
    this.searchInput.nativeElement.select();
  }

  searchOptionSelected(option: SearchBoxDto) {
    this.searchOption = option.searchOption;
    this.searchInput.nativeElement.value = '';
  }

  onHistoryClick(suggestion: SearchSuggestion) {
    this.searchHistoryOverlay.hide();
    //this.appStore.setData('option', 'dosyano');
    this.appStore.setData('keyword', suggestion.text);
    this.router.navigateByUrl('/quickSearch');
  }
}

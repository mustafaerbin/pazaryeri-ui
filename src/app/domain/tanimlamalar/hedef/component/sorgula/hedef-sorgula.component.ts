import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { AbstractSorgulaComponent } from '../../../../../shared/components/abstract-sorgula-component';
import { AppStore } from '../../../../../shared/utils/app.store';
import { Durum, DurumAktifPasif, DurumEvetHayir } from '../../../../../shared/utils/constants';
import { HedefStore } from '../../service/hedef.store';
import { HedefService } from '../../service/hedef.service';
import { HedefSorguSonucu } from '../../dto/hedef-sorgu-sonucu';
import { HedefSorguKriterleri } from '../../dto/hedef-sorgu-kriterleri';
import * as FileSaver from 'file-saver';
import {
  ASC,
  DEFAULT_PREDICATE,
  DESC,
  FIRST_PAGE,
  ITEMS_PER_PAGE
} from '../../../../../shared/config/pagination.constants';
import { QueryObject } from '../../../../../shared/model/request.model';
import { CommonLazytableComponent } from '../../../../../shared/components/lazytable/common-lazytable.component';
import { Hedef } from '../../dto/hedef';
import { ConfirmType } from '../../../../../shared/model/confirm-data';
import { TableLazyLoadEvent } from 'primeng/table';
import { TranslateService } from '@ngx-translate/core';
import { PageInfo } from '../../../../../shared/model/page-info.model';

@Component({
  templateUrl: './hedef-sorgula.component.html',
  styleUrls: ['../../../../../shared/components/datatable/common-datatable.component.css']
})
export class HedefSorgulaComponent extends AbstractSorgulaComponent implements OnInit {

  public sorguForm: UntypedFormGroup;
  public durumList: SelectItem [] = [];
  @ViewChild('dataTable') sorguSonucuDt: CommonLazytableComponent;
  isLoading = false;
  predicate = DEFAULT_PREDICATE;
  ascending: boolean = true;
  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = FIRST_PAGE;
  results: HedefSorguSonucu[] = [];
  selectedHedef: Hedef[];
  selectAll: boolean = false;
  silOnay = true;
  enums = {
    durum: DurumAktifPasif
  };
  filteredCols = [];
  exportedCols = [];

  public cols = [
    { field: 'id', type: this.ColumnType.NUMBER },
    { field: 'adi', header: 'label.ad', type: this.ColumnType.STRING },
    { field: 'aciklama', header: 'label.aciklama', type: this.ColumnType.STRING },
    { field: 'durum', header: 'label.durum', type: this.ColumnType.ENUM, enum: DurumAktifPasif }
    /*{field: 'tanitanKullanici', header: 'label.ekleyen.kullanici', type: this.ColumnType.KULLANICI},
    {field: 'creationTime', header: 'label.ekleme.zamani', type: this.ColumnType.DATE_TIME},
    {field: 'guncelleyenKullanici', header: 'label.guncelleyen.kullanici', type: this.ColumnType.KULLANICI},
    {field: 'updateTime', header: 'label.guncelleme.zamani', type: this.ColumnType.DATE_TIME}*/
  ];

  constructor(appStore: AppStore,
              public entityStore: HedefStore,
              private formBuilder: UntypedFormBuilder,
              private entityService: HedefService,
              private router: Router,
              private translateService: TranslateService) {
    super(appStore);
  }

  ngOnInit() {
    this.filteredCols = this.cols.filter(col => col.field !== 'id');
    this.exportedCols = this.filteredCols.map(col => {
    });
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      const navigation = this.router.getCurrentNavigation();
      const geriDon = this.appStore.getData('hedefGeriDon');
      let freshRoute = navigation.extras?.state?.freshRoute || false;
      if (freshRoute && !geriDon) {
        setTimeout(() => {
          this.temizle();
        }, 100);
      }
    });
    this.buildForms();
    this.loadData();
  }

  translate(obj): string {
    return this.translateService.instant(obj);
  }

  onSelectionChange(value = []) {
    console.log("value",value);
    this.selectAll = value.length === this.totalItems;
    this.selectedHedef = value;
  }

  onSelectAllChange(event) {

    const checked = event.checked;
    console.log("checked",checked);

    if (checked) {
      this.selectAll = true;
      this.subscribeToResponse(this.entityService.getAll(), this.sorgulaSuccess, undefined);
    } else {
      this.selectedHedef = [];
      this.selectAll = false;
    }
  }

  public sorgula() {
    this.resetPaging();
    this.getQuery();
  }

  private resetPaging() {
    this.page = FIRST_PAGE;
    this.predicate = DEFAULT_PREDICATE;
  }

  loadDatas(event: TableLazyLoadEvent) {
    this.setPaging(event);
    this.getQuery();
  }

  getQuery() {
    this.isLoading = true;
    this.subscribeToResponse(this.entityService.query(this.prepareData()), this.sorgulaSuccess, undefined);
  }

  private setPaging(event: TableLazyLoadEvent) {
    this.page = event.first / event.rows;
    const size = event.rows;
    this.predicate = `${event.sortField ? event.sortField : DEFAULT_PREDICATE}`;
    this.ascending = !!event.sortOrder;
  }

  public silAction(id) {
    this.subscribeToResponse(this.entityService.delete(id), this.silSuccess);
  }

  protected temizle() {
    this.selectAll = false;
    this.selectedHedef = [];
    this.buildForms();
    this.entityStore.clear();
    this.sorgula();
  }

  private silSuccess(id) {
    this.entityStore.delete(id);
    this.appStore.addInstantSuccessMessage();
    this.sorgula();
  }

  private sorgulaSuccess(data: HedefSorguSonucu[], pageInfo: PageInfo) {
    this.results = data;
    if(this.selectAll) {
      this.selectedHedef = this.results
      this.totalItems = this.results.length
    }else {
      this.totalItems = pageInfo.totalElements;
      this.page = pageInfo.currentPage;
    }
    this.entityStore.set(data);
    this.isLoading = false;
  }

  private buildForms() {
    this.sorguForm = this.formBuilder.group({
      adi: [null],
      durum: [null],
      aciklama: [null, Validators.compose([Validators.maxLength(1024)])]
    });
  }

  private loadData() {
    this.durumList = this.appStore.selectService.getUnSelected(DurumEvetHayir, true, Durum.MANTIKSAL_SILINMIS);
  }

  private prepareData(): QueryObject<HedefSorguKriterleri> {
    const formModel = this.sorguForm.value;
    const criteria = {
      adi: formModel.adi,
      durum: Durum[formModel.durum],
      aciklama: formModel.aciklama
    };
    const queryObject: QueryObject<HedefSorguKriterleri> = {
      criteria,
      number: this.page,
      size: this.itemsPerPage,
      sort: this.sort()
    };
    return queryObject;
  }

  private sort(): string[] {
    const result = [`${this.predicate},${this.ascending ? ASC : DESC}`];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  exportToPdf() {
    const data : Hedef[] | HedefSorguSonucu[] = this.selectedHedef.length > 0 ? this.selectedHedef : this.results;
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default();
        const translatedHeaders = this.filteredCols
          .map(col => this.translateService.instant(col.header));
        const tableData = data.map(result => {
          return [
            result.adi,
            result.aciklama,
            this.translate(result.durum)
          ];
        });
        (doc as any).autoTable({
          head: [translatedHeaders],
          body: tableData
        });
        doc.save('hedef-tanimlari.pdf');
      });
    });
  }

  exportToExcel(): void {
    const data : Hedef[] | HedefSorguSonucu[] = this.selectedHedef.length > 0 ? this.selectedHedef : this.results;
    import('xlsx').then(xlsx => {
      const dataWithTranslatedEnums = data.map(result => ({
        ...result,
        durum: this.translate(result.durum)  // Enum değerini çevirerek yeni nesne oluştur
      }));
      const worksheet = xlsx.utils.json_to_sheet(dataWithTranslatedEnums);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'hedef-tanimlari');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`);
  }

  silConfirm(id) {
    if (this.silOnay) {
      this.appStore.confirm(
        {
          type: ConfirmType.SIL,
          acceptFunction: () => {
            this.silAction(id);
          }
        }
      );
    } else {
      console.log('sil iptal function');
    }
  }
}

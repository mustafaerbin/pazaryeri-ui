import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonDatatableComponent} from '../datatable/common-datatable.component';
import {LazyDataService} from './lazy-data.service';
import {ColumnType} from '../abstract-base-component';
import {Constants} from "../../utils/constants";
import {Observable} from "rxjs";
import {LazyLoadEvent} from 'primeng/api';
import {TableLazyLoadEvent} from "primeng/table";

@Component({
  selector: 'app-common-lazy-dt',
  templateUrl: './common-lazytable.component.html',
  styleUrls: [
    '../datatable/common-datatable.component.css',
    './common-lazytable.component.css'
  ],
})
export class CommonLazytableComponent extends CommonDatatableComponent {

  _lazyData: any[];
  allSelected: boolean = false;
  selectedItemCount: number = 0;
  excludedList: any[] = [];
  singleSelectionData: any[] = [];
  exportKayitSayisiBas: number=0;
  exportKayitSayisiBit: number=0;
  exportEdilmekIstenenKayitSayisi: number;

  @Input() loadLazySelectionData: () => Observable<any[]>;

  @Input()
  set lazyData(lazyData) {
    this._lazyData = lazyData;
    this.data = [];
    if (this.lazyData && this.lazyData.length) {
      this.totalRecords = this.lazyData.length;
      if (this.service) {
        this.loadLazy();
      }
    }
  }

  get lazyData() {
    return this._lazyData;
  }

  @Input() service: LazyDataService;

  @Input() totalRecords: number = 0;

  @Output() pageChangeListener = new EventEmitter<number>();
  @Output() lazyLoadEvent = new EventEmitter<TableLazyLoadEvent>();

  exportToExcelControlMaxLimit(): boolean {
    if (this.totalRecords > Constants.LAZY_DATATABLE_EXCEL_REPORT_WARNING_LIMIT) {
      this.appStore.addMessage({
        severity: 'error',
        summary: this.appStore.translate.instant('warning.export.excel.message', {
          value: Constants.LAZY_DATATABLE_EXCEL_REPORT_WARNING_LIMIT
        })
      });
      return false;
    }
    return true;
  }

  exportToExcel() {
    if (!this.service) {
      if (this.exportKayitSayisiBas != undefined && this.exportKayitSayisiBas >= 0 &&
        this.exportKayitSayisiBit != undefined && this.exportKayitSayisiBit > 0) {
        this.intervalDataExport();
      } else if (this.selectedItemCount > 0) {
        if (this.selectedItemCount > Constants.LAZY_DATATABLE_EXCEL_REPORT_WARNING_LIMIT) {
          this.appStore.addMessage({
            severity: 'error',
            summary: this.appStore.translate.instant('warning.export.excel.message', {
              value: Constants.LAZY_DATATABLE_EXCEL_REPORT_WARNING_LIMIT
            })
          });
          return;
        }
        if (this.allSelected || this.secilecekKayitSayisi) {
          this.appStore.loading = true;
          this.loadLazySelectionData.call(this.that).subscribe(data => {
            this.excelService.exportAsExcelFile(this.buildData(data, this.cols), this.cols, this.columns, 'report');
            this.appStore.loading = false;
          });
        } else {
          this.excelService.exportAsExcelFile(this.singleSelectionData, this.cols, this.columns, 'report');
        }
      }
    } else {
      this.exportToExcelIslem();
    }
  }

  intervalDataExport() {
    this.exportEdilmekIstenenKayitSayisi = this.exportKayitSayisiBit - this.exportKayitSayisiBas;

    if(this.exportEdilmekIstenenKayitSayisi > Constants.LAZY_DATATABLE_EXCEL_PIECED_REPORT_WARNING_LIMIT){
      this.appStore.addMessage({
        severity: 'error',
        summary: this.appStore.translate.instant('warning.export.excel.message', {
          value: Constants.LAZY_DATATABLE_EXCEL_PIECED_REPORT_WARNING_LIMIT
        })
      });
      return;
    }

    this.resetSelection();
    this.kayitTemizle();
    this.selectedItemCount = this.exportKayitSayisiBit;

    let page = Math.floor(this.exportKayitSayisiBas / 1000) + 1;
    let exportKayitSayisiBas = this.exportKayitSayisiBas % 1000 !== 0 ? this.exportKayitSayisiBas : 0;

    this.loadLazySelectionData.call(this.that, page, exportKayitSayisiBas).subscribe(data => {
      this.excelService.exportAsExcelFile(this.buildData(data, this.cols), this.cols, this.columns, 'report');
      this.selectedItemCount = 0;
      this.exportKayitSayisiBas = 0;
      this.exportKayitSayisiBit = 0;
      this.exportEdilmekIstenenKayitSayisi = 0;
    });
  }

  exportToExcelIslem() {
    const data = this.checkbox ? this.selected : this._lazyData;
    if (data.length === 0) {
      this.appStore.addMessage({
        severity: 'error',
        summary: this.appStore.translate.instant('label.kayit.secilmeli.info')
      });

      return;
    }

    this.loading = true;
    this.subscribeToResponse(this.service.loadLazyData(data, {first: 0, rows: data.length}), data => {
      this.excelService.exportAsExcelFile(this.buildData(data,this.cols), this.cols, this.columns, 'report');
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.data = [];
    if (this.lazyData && this.lazyData.length) {
      this.totalRecords = this.lazyData.length;
      this.loadLazy();
    }
    super.ngOnInit();
  }

  loadLazy(event?: TableLazyLoadEvent) {
    if (!!this.service) {
      if (!this.lazyData || !this.lazyData.length) {
        return;
      }

      this.loading = true;
      this.subscribeToResponseBase(this.service.loadLazyData(this.lazyData, event), (data) => {
        this.data = data;
        this.loading = false;
      });
    } else {
      this.lazyLoadEvent.emit(event);
    }
  }

  radioButtonEvent(rowData: any) {
    if (this.selected === rowData.id || rowData.rowDisabled) {
      return;
    }

    this.selected = rowData.id;
    this.selectionDetect();
  }

  checkboxEvent(rowData: any) {
    if (this.disabledCheckBox || this.secilenKayitSayisi || rowData.rowDisabled) {
      return;
    }

    this.kayitKilidiAc();
    if (this.isChecked(rowData.id)) {
      const index = this.selected.findIndex(value => value === rowData.id);
      if (index > -1) {
        let deletedItem = this.selected.splice(index, 1);

        if (this.allSelected) {
          this.excludedList.push(rowData);
        } else {
          this.singleSelectionData.splice(index, 1);
        }

        this.selectedItemCount--;
        if (this.selectedItemCount == 0) {
          this.resetSelection();
        }

        if (this.allSelected) {
          this.excludedList.push(rowData);
        } else {
          this.singleSelectionData.splice(index, 1);
        }

        //this.selectedItemCount--;
        if (this.selectedItemCount == 0) {
          this.resetSelection();
        }
      }
    } else {
      this.selected.push(rowData.id);

      if (this.allSelected) {
        let excludedIndex = this.excludedList.findIndex(item => item.id == rowData.id);
        if (excludedIndex > -1) {
          this.excludedList.splice(excludedIndex, 1);
        }
      } else {
        this.singleSelectionData.push(rowData);
      }
      this.selectedItemCount++;
    }
    this.selectionArrayDetect();
    if(!!this.lazyData){
      this.selectionDetect();
    }
  }

  resetSelection() {
    this.allSelected = false;
    this.selectedItemCount = 0;
    this.singleSelectionData = [];
    this.excludedList = [];
    this.selected = [];
  }

  checkboxAllEvent() {
    this.singleSelectionData = [];
    this.kayitKilidiAc();
    this.allSelected = !this.allSelected;
    if (!this.allSelected) {
      if (this.excludedList.length > 0) {
        this.selected = [...this.selected, ...(this.excludedList.map(e => e.id))];
        this.selectedItemCount = this.totalRecords;
        this.excludedList = [];
        this.allSelected = true;
      } else {
        this.excludedList = [];
        this.selected = [];
        this.selectedItemCount = 0;
      }
    } else {
      if (!this.lazyData) {
        this.selected = this.data.slice().map(item => item.id);
      } else {
        this.selected = this.lazyData.slice().map(item => item);
      }
      this.selectedItemCount = this.totalRecords;
      this.secilecekKayitSayisi = 0;
    }
    this.selectionArrayDetect();
    if(!!this.lazyData){
      this.selectionDetect();
    }
  }

  isChecked(data: any) {
    if (!!this.selected && this.selected instanceof Array) {
      return !!this.selected.find(value => value === (typeof data === 'number' ? data : data.id));
    } else {
      return this.selected === data.id;
    }
  }

  isCheckedAll() {
    return (this.allSelected && !this.excludedList.length) || this.secilecekKayitSayisi >= this.totalRecords;
  }


  kayitTemizle() {
    super.kayitTemizle();
    this.singleSelectionData = [];
  }

  kayitSec() {
    this.secilenKayitSayisi = this.secilecekKayitSayisi || 0;
    this.selectedItemCount = this.secilenKayitSayisi;
    this.singleSelectionData = [];
    this.allSelected = false;
    this.excludedList = [];
    this.selected = [];

    if (this.selectedItemCount) {
      this.selectionNumberOfItemsDetect(this.data);
    }

    this.selectionArrayDetect();
    if(!!this.lazyData){
      this.selectionDetect();
    }
  }

  selectionNumberOfItemsDetect(data) {
    let rows = this.datatable.rows;
    let page = this.datatable.first / rows;

    let itemCountToSelect = this.selectedItemCount - rows * page;
    if (itemCountToSelect > 0) {
      if (data.length > itemCountToSelect) {
        this.selected = data.slice(0, itemCountToSelect).map(item => item.id);
      } else {
        this.selected = data.slice().map(item => item.id);
      }
    }
  }

  onPageDataChange(data) {
    if (this.allSelected) {
      let pageData: number[] = data.slice()
        .filter(item => this.excludedList.findIndex(excludedItem => excludedItem.id == item.id) == -1)
        .map(item => item.id);
      if (pageData && pageData.length) {
        this.selected = pageData;
        this.selectionArrayDetect();
      }
    } else if (this.secilecekKayitSayisi) {
      this.selectionNumberOfItemsDetect(data);
    }
  }

  customSort(event: LazyLoadEvent) {
    if (this.data && event.sortField) {
      let sortCol = this.cols.find(c => c.field === event.sortField);

      this.data.sort((data1, data2) => {
        let value1 = data1[event.sortField];
        let value2 = data2[event.sortField];
        let result = null;

        if (!value1 && !!value2) {
          result = -1;
        } else if (!!value1 && !value2) {
          result = 1;
        } else if (!value1 && !value2) {
          result = 0;
        } else if (typeof value1 === 'string' && typeof value2 === 'string') {
          result = value1.localeCompare(value2);
        } else if (sortCol.type === ColumnType.PARA_OBJECT) {
          result = (value1.value < value2.value) ? -1 : (value1.value > value2.value) ? 1 : 0;
        } else {
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
        }
        return (event.sortOrder * result);
      });
    }
  }

  selectionDetect() {
    if (this.checkbox) {
      if (this.selected && this.selected instanceof Array) {
        this.selection.emit(this.lazyData.filter(value => this.selected.find(value2 => value2 == value)));
      } else {
        this.selection.emit([]);
      }
    } else {
      if (this.selected && !(this.selected instanceof Array)) {
        this.selection.emit(this.lazyData.find(value => this.selected == value));
      } else {
        this.selection.emit(null);
      }
    }
  }

  onPage(e) {
    if (this.pageChangeListener) {
      this.pageChangeListener.emit(e);
    }
  }

  protected emitSelection() {
  }
}

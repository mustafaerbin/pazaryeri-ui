import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ConfirmType} from '../../model/confirm-data';
import {AppStore} from '../../utils/app.store';
import {ExcelService} from './excel.service';
import {AbstractBaseComponent, Col, ColumnType, Operations} from '../abstract-base-component';
import {FilterService, MenuItem} from "primeng/api";
import {Table} from "primeng/table";

@Component({
  selector: 'app-common-dt',
  templateUrl: './common-datatable.component.html',
  styleUrls: ['./common-datatable.component.css'],
})
export class CommonDatatableComponent extends AbstractBaseComponent implements OnInit, OnChanges {

  showFilter: false;
  items: MenuItem[];
  columnOptions: Col[] = [];
  columns: Col[] = [];
  islemler = false;

  @Input() loading;
  @Input() header: string;
  @Input() emptyLabel;
  @Input() checkbox = false;
  @Input() export = true;
  @Input() radio = false;
  @Input() emitNullOnSelection = false;
  @Input() hiddenColumn: string[] = ['updateTime', 'guncelleyenKullanici', 'creationTime', 'tanitanKullanici'];
  @Input() selected: number[] = [];
  @Input() cols: Col[];
  @Input() that;
  @Input() class = 'ui-g-12';
  @Input() footer = false;

  @Input() operations: Operations[];
  @Input() goruntule = false;
  @Input() guncelle = false;
  @Input() sil = false;
  @Input() silObject = false;
  @Input() tarihce = false;
  @Input() sortField;
  @Input() silOnay = true;
  @Input() disabledCheckBox = false;

  @Input() rowClass;
  @Input() rowFunc: (any) => any;

  @Input() datatableOpen = true;
  @Output() datatableToggle: EventEmitter<any> = new EventEmitter<any>();

  @Output() selection: EventEmitter<any> = new EventEmitter<any>();
  @Output() filtered: EventEmitter<any> = new EventEmitter<any>();
  @Output() silEvent: EventEmitter<any> = new EventEmitter<any>();

  secilecekKayitSayisi: number = 0;
  secilenKayitSayisi: number = 0;

  constructor(public excelService: ExcelService,
              private readonly filterService: FilterService,
              appStore: AppStore) {
    super(appStore);
  }

  private _selection: any[] = [];
  private _filtered: any[] = [];

  get selectionArray() {
    return this._selection;
  }

  set selectionArray(val: any) {
    this._selection = val;
    this.emitSelection();
  }

  get filteredArray() {
    return this._filtered;
  }

  set filteredArray(val: any) {
    this._filtered = val;
    this.emitFiltered();
  }

  private _datatable: Table;

  get datatable(): Table {
    return this._datatable;
  }

  @ViewChild('dt')
  set datatable(theElementRef: Table) {
    this._datatable = theElementRef;
  }

  private _data: any[];

  @Input()
  get data() {
    return this._data;
  }

  set data(val) {
    this._data = this.buildData(val, this.cols);
    this.afterDataSet();
    if (this.datatable != undefined && !this.datatable.lazy)
      this.datatable.first = 0;
  }

  ngOnInit(): void {
    if (this.goruntule || this.guncelle || this.sil || this.silObject || this.tarihce ||
      (this.operations && this.operations.length > 0)) {
      this.islemler = true;
    }
    if (this.cols && this.columnOptions.length <= 0) {
      this.cols.forEach(col => {
        if (col.header != null) {
          col.label = this.appStore.translate.instant(col.header);
          this.columnOptions.push(col);
          if (this.hiddenColumn.indexOf(col.field) === -1) {
            this.columns.push(col);
          }
        }
      });
    }
    if (this.data) {
      this.data = this.data;
    }
    this.filterService.register('dateTimeFilterCustom', (value, filter): boolean => {
      if (filter === undefined || filter === null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      let valueDate = new Date(value);
      valueDate.setHours(0, 0, 0, 0);
      return filter == valueDate.getTime();
    });

    this.filterService.register('paraFilterCustom', (value, filter): boolean => {
      if (filter === undefined || filter === null) {
        return true;
      }
      if (value === undefined || value === null) {
        return false;
      }
      return value.toString().includes(filter);
    });

    this.initDataTable();
    this.selectionArrayDetect();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }



  protected emitSelection() {
    this.selection.emit(this._selection);
  }

  protected emitFiltered() {
    this.filtered.emit(this._filtered);
  }

  selectionArrayDetect() {
    if (this.checkbox) {
      if (this.selected && this.selected instanceof Array) {
        // tablolarda id'si 0 olan kayýtlar i穮 filtreleme de𩾴irildi.
        this.selectionArray = this.data.filter(value => this.selected.find(value2 => value2 === value['id']) == 0 ? 1 : this.selected.find(value2 => value2 === value['id']));
      } else {
        this.selectionArray = this.emitNullOnSelection ? null: [];
      }
    } else {
      if (this.selected && !(this.selected instanceof Array)) {
        this.selectionArray = this.data.find(value => this.selected === value['id']);
      } else {
        this.selectionArray = this.emitNullOnSelection ? null: [];
      }
    }
  }

  sortColumn(event) {
    if (this.data && event.field) {
      let sortCol = this.cols.find(c => c.field === event.field);

      this.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
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
        return (event.order * result);
      });
    }
  }

  isHidden(column: string): boolean {
    return this.columns.findIndex((val) => {
      return val.field === column;
    }) === -1;
  }

  exportToExcel() {
    const data = this.checkbox ? this.selectionArray : this.data;
    this.excelService.exportAsExcelFile(this.buildData(data, this.cols), this.cols, this.columns, 'report');
  }

  exportToPdf() {
    const data = this.checkbox ? this.selectionArray : this.data;
    this.excelService.exportAsPdfFile(this.buildData(data, this.cols), this.cols, this.columns, 'report');
  }

  renderEmptyLabel() {
    return (this.emptyLabel && this.data && this.data.length === 0 && !this.loading);
  }

  silConfirm(id) {
    if (this.silOnay) {
      this.appStore.confirm(
        {
          type: ConfirmType.SIL,
          acceptFunction: () => {
            this.silEvent.emit(id);
          }
        }
      );
    } else {
      this.silEvent.emit(id);
    }
  }

  silObjectConfirm(obj) {
    if (this.silOnay) {
      this.appStore.confirm(
        {
          type: ConfirmType.SIL,
          acceptFunction: () => {
            this.silEvent.emit(obj);
          }
        }
      );
    } else {
      this.silEvent.emit(obj);
    }
  }

  call(func, ...rowData) {
    if (func) {
      if (rowData) {
        return func.bind(this.that, ...rowData).call();
      } else {
        return func.bind(this.that).call();
      }
    }
  }

  kayitSec() {
    this.secilenKayitSayisi = this.secilecekKayitSayisi || 0;

    this.selected = [];
    for (let i = 0; i < (this.secilecekKayitSayisi || 0); i++) {
      this.selected.push(this.data[i].id);
    }
    this.selectionArrayDetect();
  }

  kayitTemizle() {
    this.secilecekKayitSayisi = 0;
    this.kayitSec();
  }

  kayitKilidiAc() {
    this.secilenKayitSayisi = 0;
  }

  isChecked(data: any) {
    if (!this.selectionArray) return null;

    if (Array.isArray(this.selectionArray)) {
      return !!this.selectionArray.find(value => value.id == (typeof data === 'number' ? data : data.id));
    } else {
      return this.selectionArray.id === (typeof data === 'number' ? data : data.id) ? this.selectionArray : null
    }
  }

  isCheckedAll() {
    return this.selectionArray && this.selected && this.selectionArray.length === this.selected.length;
  }

  accordionEvent(event: any, opened: boolean) {
    event['opened'] = opened;
    this.datatableToggle.emit(event);
  }

  protected afterDataSet() {
  }

  protected initDataTable(): void {
    this.buildExport();
  }

  private buildExport() {

    let excelLabel: string = this.appStore.translate.instant('label.excel');
    let pdfLabel: string = this.appStore.translate.instant('label.pdf');

    this.items = [
      {
        label: excelLabel, icon: 'far fa-file-excel', command: () => {
          if (this.checkbox) {
            this._datatable.exportCSV({selectionOnly: true});
          } else {
            this._datatable.exportCSV();
          }
        }
      },
      {
        label: pdfLabel, icon: 'far fa-file-pdf', command: () => {
          if (this.checkbox) {
            this._datatable.exportCSV({selectionOnly: true});
          } else {
            this._datatable.exportCSV();
          }
        }
      }
    ];
  }

  paraFilter(value: any, field: any, dt: Table) {
    if (value) {
      value = value.replace('.', '')
      value = value.replace(',', '.')
    }
    dt.filter(value, field, 'paraFilterCustom');
  }

  paraObjectFilter(value: any, field: any, dt: Table) {
    if (value) {
      value = value.replace('.', '')
      value = value.replace(',', '.')
    }
    dt.filter(value, field + '.value', 'paraFilterCustom');
  }

}

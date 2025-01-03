import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import * as XLSX from 'xlsx';
import {TranslateService} from "@ngx-translate/core";
import {Constants} from "../../utils/constants";
import {Col, ColumnType, ExportFileType} from "../abstract-base-component";
import {formatDate} from '@angular/common';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {AppStore} from "../../utils/app.store";


const EXCEL_EXTENSION = '.xlsx';
const PDF_EXTENSION = '.pdf';

@Injectable({providedIn: 'root'})
export class ExcelService {

  _appStore: AppStore

  constructor(private translate: TranslateService,
              private appStore: AppStore,
              @Inject(LOCALE_ID) private locale: string) {
    this._appStore = appStore;
  }

  public exportAsExcelFile(json: any[], allCols: Col[], cols: Col[], excelFileName: string): void {

    let retData: any[] = [];
    let header = [];
    let newCols = [];

    this.prepareHeader(cols, newCols, header);

    retData.push(header);
    this.prepareRowData(json, cols, retData, ExportFileType.EXCELL);

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(retData, {
      header: header,
      skipHeader: true
    });
    // this.styleHeader(worksheet);

    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};

    XLSX.writeFile(workbook, excelFileName + new Date().getTime() + EXCEL_EXTENSION, {
      compression: true
    });
  }

  public exportAsPdfFile(json: any[], allCols: Col[], cols: Col[], fileName: string): void {

    let retData: any[] = [];
    let header = [];
    let newCols = [];

    this.prepareHeader(cols, newCols, header);

    this.prepareRowData(json, cols, retData, ExportFileType.PDF);

    this.exportPDF(retData, header, fileName);
  }

  private getParaBirimi(paraBirimiId: string): any {
    return Constants.paraBirimiList.find((value) => {
      return value.value === paraBirimiId;
    });
  }

  private styleHeader(worksheet: XLSX.WorkSheet) {
    const headerStyle = {
      alignment: {vertical: 'center', horizontal: 'center'},
      font: {bold: true, color: {rgb: "FFFFFFFF"}},
      fill: {
        bgColor: {theme: "4", tint: "-0.25"},
        fgColor: {theme: "4", tint: "-0.25"}
      }
    };
    const first = 'A';
    const last = worksheet["!ref"].split(':').reverse()[0].replace(/([0-9]+)/, '');

    for (let i = first.charCodeAt(0); i <= last.charCodeAt(0); i++) {
      this.setCellStyle(worksheet[String.fromCharCode(i) + '1'], headerStyle);
    }
  }

  private setCellStyle(cell: XLSX.CellObject, style: {}) {
    cell.s = style;
  }

  exportPDF(rowData, header, fileName: string) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    function buildTableBody(data, columns) {
      const body = [];

      body.push(Object.values(columns));

      data.forEach(function (row) {
        const dataRow = [];

        Object.keys(columns).forEach(function (column) {
          let dt = row[column] == null ? '' : row[column].toString();
          dataRow.push(dt);
        });

        body.push(dataRow);
      });

      return body;
    }

    function table(data, columns) {
      return {
        table: {
          widths: 'auto',
          headerRows: 1,
          body: buildTableBody(data, columns)
        },
        layout: {
          fillColor: function (rowIndex, node, columnIndex) {
            return (rowIndex === 0) ? '#cccccc' : null;
          }
        }
        // layout: 'lightHorizontalLines',
      }
    }

    const docDefinition = {
      pageSize:'A2',
      pageOrientation: 'landscape',
      content: [
        table(rowData, header)
      ],
      defaultStyle: {
        fontSize: 9,
      }
    };

    pdfMake.createPdf(docDefinition).download(fileName + new Date().getTime() + PDF_EXTENSION);
  }

  private prepareHeader(cols: Col[], newCols: any[], header: any[]) {
    cols.forEach((c, i) => {
      newCols.push(c);
      if (c.type === ColumnType.PARA_OBJECT) {
        newCols.push({field: 'paraBirimi' + i, header: 'label.para.birimi', type: ColumnType.STRING})}
    });

    newCols.forEach(col => {
      header[col.field] = this.translate.instant(col.header);
    });
  }


  private prepareRowData(json: any[], cols: Col[], retData: any[], exportFileType: ExportFileType) {
    json.forEach(data => {
      let insertData: any = [];
      cols.forEach((col, i) => {
          if (col.type === ColumnType.ENUM) {
            insertData[col.field] = data[col.field + '_ack']
          } else if (col.type === ColumnType.TRANSLATE) {
            insertData[col.field] = data[col.field + '_trns']
          } else if (col.type === ColumnType.DATE_TIME) {
            insertData[col.field] = data[col.field] ? formatDate(data[col.field], Constants.DATE_TIME_FMT, this.locale) : null;
          } else if (col.type == ColumnType.DATE) {
            if (ExportFileType.PDF === exportFileType) {
              insertData[col.field] = data[col.field] ? formatDate(data[col.field], Constants.DATE_FMT, this.locale) : null;
            } else {
              insertData[col.field] = data[col.field] ? new Date(data[col.field]) : null;
            }
          } else if (col.type === ColumnType.PARA_OBJECT) {
            if (data[col.field]) {
              insertData[col.field] = data[col.field].value;
              insertData['paraBirimi' + i] = this.getParaBirimi(data[col.field].paraBirimi).label;
            }
          } else {
            insertData[col.field] = data[col.field];
          }
         });
      retData.push(insertData)
    });
  }

  private getKilitliMasterColonData(data:any, col:any) {
    return data[col.field] ? this.appStore.translate.instant('KILITLI') : '';
  }


}

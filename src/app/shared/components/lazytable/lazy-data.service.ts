import {Observable} from 'rxjs';
import {LazyLoadEvent} from 'primeng/api';
import {AppResponse} from '../../model/app-response';
import {TableLazyLoadEvent} from "primeng/table";

export interface LazyDataService {

  loadLazyData(lazyData: any[], event: TableLazyLoadEvent): Observable<AppResponse>;
}

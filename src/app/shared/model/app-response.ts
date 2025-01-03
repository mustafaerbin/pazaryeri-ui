import { PageInfo } from './page-info.model';

export interface AppResponse {
  status: number;
  errorMessage: string;
  pageInfo?: PageInfo;
  data: any;
}


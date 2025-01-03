import { HttpParams } from '@angular/common/http';
import { QueryObject } from '../model/request.model';

export const createRequestParams = <T>(queryObject: QueryObject<T>): HttpParams => {
  const { criteria, size, number, sort } = queryObject;
  let params = new HttpParams();

  params = params.set('page', number.toString());
  params = params.set('size', size.toString());

  sort.forEach(sortParam => {
    params = params.append('sort', sortParam);
  });

  Object.keys(criteria).forEach(key => {
    if (criteria[key] !== undefined && criteria[key] !== null) {
      params = params.set(key, criteria[key]);
    }
  });

  return params;
};

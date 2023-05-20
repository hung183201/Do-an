import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { map, mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { environment } from 'environments/environment';

import { ApiResult, ApiCode } from '../models/common/atom/api-result';
import { KeyValueViewModel } from '../models/common/atom/key-value-viewmodel';
import { forEach } from 'core-js/es7/array';



@Injectable()
export class CommonMainService {

  constructor(private http: HttpClient) {

  }


  public getApi<T>(suffix: string, params: Array<KeyValueViewModel>): Observable<T> {

    if (suffix.startsWith('/')) suffix = suffix.substring(1);
    
    const apiPath = `/${suffix}${this.getQueryParamForGetRequest(params)}`;
    const requestUri = environment.apiUrl + apiPath;
    return this.http.get<ApiResult<T>>(`${requestUri}`).pipe(map(result => result.data));;
  }

  private getQueryParamForGetRequest(listKeyValue: Array<KeyValueViewModel>): string {
    let result: string = "";
    if (!listKeyValue || listKeyValue.length == 0) return result;
    result = "?";

    listKeyValue.forEach(function (keyValue) {
      result = `${result}${keyValue.key}=${keyValue.value}&`;
    });
    return result;
  }

}


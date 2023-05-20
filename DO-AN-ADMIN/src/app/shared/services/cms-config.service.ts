import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { PagedListModel, ResponseModel } from '../model/response-model';

@Injectable({
  providedIn: 'root'
})
export class CmsConfigService {

  public baseUrl: string

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  // Danh sách cấu hình
  public getDanhSachConfig<T = ResponseModel>(params: any = null, path: string = '/api/CauHinh/GetAppConfig') {
    return this.http.get<PagedListModel>(`${this.baseUrl}${path}`, { params: params });
  }

  // API lưu cấu hình
  public postSaveCauHinh<T = any>(body: any = null, path: string = '/api/CauHinh/InsUpdateAppConfig') {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

}

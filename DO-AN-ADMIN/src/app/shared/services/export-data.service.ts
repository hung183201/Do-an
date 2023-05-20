import { QuyenUserViewModel } from '../models/cadas/storage/quyen-user-viewmodel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ResponseModel } from '../model/response-model';
import { ApiResult } from '../models/common/atom/api-result';

@Injectable({
  providedIn: 'root'
})
export class ExportDataService {

  public baseUrl: string

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  // Danh sách người xử lý
  public getDanhSachNguoiXuLy<T = ResponseModel>(params: any = null, path: string = '/api/NguoiDung/GetDanhSachNguoiDungByPhongBanId') {
    return this.http.get<ApiResult<Array<QuyenUserViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

}

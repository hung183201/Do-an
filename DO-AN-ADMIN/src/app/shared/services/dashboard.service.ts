import { ThongKeHoSoLuuTruViewModel } from './../models/cadas/storage/danh-sach-quan-huyen-viewmodel copy';
import { ApiResult } from './../models/common/atom/api-result';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { PagedListModel, ResponseModel } from '../model/response-model';
import { DanhSachQuanHuyenViewModel } from '../models/cadas/storage/danh-sach-quan-huyen-viewmodel';
import { TenDiaBanViewModel } from '../models/cadas/storage/ten-dia-ban-viewmodel';
import { LoaiHoSoLuuTruTheoDVHCViewModel } from '../models/cadas/storage/ho-so-luu-tru-theo-dvhc-viewmodel';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  public baseUrl: string

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  // Danh sách quận/huyện
  public getDanhSachQuanHuyen<T = ResponseModel>(params: any = null, path: string = '/api/DanhMuc/GetDanhSachHuyen') {
    return this.http.get<ApiResult<Array<DanhSachQuanHuyenViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Biểu đồ hồ sơ
  public getBieuDoHoSo<T = ResponseModel>(params: any = null, path: string = '/api/ThongKe/GetThongKeHoSoLuuTruTheoDVHC') {
    return this.http.get<ApiResult<Array<LoaiHoSoLuuTruTheoDVHCViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get tên địa bàn thống kê
  public getTenDiaBanThongKe<T = ResponseModel>(params: any = null, path: string = '/api/DanhMuc/GetTinh') {
    return this.http.get<ApiResult<Array<TenDiaBanViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

}

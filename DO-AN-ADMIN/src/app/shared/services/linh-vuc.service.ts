import { ThongKeHoSoLuuTruViewModel } from './../models/cadas/storage/danh-sach-quan-huyen-viewmodel copy';
import { TenDiaBanViewModel } from './../models/cadas/storage/ten-dia-ban-viewmodel';
import { DanhSachQuanHuyenViewModel } from './../models/cadas/storage/danh-sach-quan-huyen-viewmodel';
import { ApiResult } from './../models/common/atom/api-result';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { PagedListModel, ResponseModel } from '../model/response-model';
import { HoSoLuuTruTheoLoaiHoSoViewModel } from '../models/cadas/storage/ho-so-luu-tru-theo-loai-ho-so-viewmodel';

@Injectable({
  providedIn: 'root'
})
export class LinhVucService {

  public baseUrl: string

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  // Danh sách quận/huyện
  public getDanhSachQuanHuyen<T = ResponseModel>(params: any = null, path: string = '/api/DanhMuc/GetDanhSachHuyen') {
    return this.http.get<ApiResult<Array<DanhSachQuanHuyenViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Biểu đồ hồ sơ
  public getBieuDoHoSo<T = ResponseModel>(params: any = null, path: string = '/api/ThongKe/GetThongKeHoSoLuuTruTheoLoaiHoSo') {
    return this.http.get<ApiResult<Array<HoSoLuuTruTheoLoaiHoSoViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Biểu đồ hồ sơ theo năm
  public getBieuDoHoSoTheoNam<T = ResponseModel>(params: any = null, path: string = '/api/ThongKe/GetThongKeHoSoLuuTruTheoDVHC') {
    return this.http.get<ApiResult<Array<ThongKeHoSoLuuTruViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get tên địa bàn thống kê
  public getTenDiaBanThongKe<T = ResponseModel>(params: any = null, path: string = '/api/DanhMuc/GetTinh') {
    return this.http.get<ApiResult<Array<TenDiaBanViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

}

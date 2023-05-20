import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { PagedListModel, ResponseModel } from '../model/response-model';

@Injectable({
  providedIn: 'root'
})
export class MuonTraHoSoService {

  public baseUrl: string

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  // Danh sách quận/huyện
  public getDanhSachQuanHuyen<T = ResponseModel>(params: any = null, path: string = '/api/DanhMuc/GetDanhSachHuyen') {
    return this.http.get<PagedListModel>(`${this.baseUrl}${path}`, { params: params });
  }

  // Biểu đồ hồ sơ
  public getBieuDoHoSo<T = ResponseModel>(params: any = null, path: string = '/api/ThongKe/GetThongKeLuotMuonTraHoSo') {
    return this.http.get<PagedListModel>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get tên địa bàn thống kê
  public getTenDiaBanThongKe<T = ResponseModel>(params: any = null, path: string = '/api/DanhMuc/GetTinh') {
    return this.http.get<PagedListModel>(`${this.baseUrl}${path}`, { params: params });
  }

}

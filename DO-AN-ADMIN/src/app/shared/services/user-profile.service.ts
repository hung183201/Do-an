import { CayDonViHanhChinhViewModel } from './../models/cadas/storage/cay-don-vi-hanh-chinh-viewmodel';
import { QuyenUserViewModel } from './../models/cadas/storage/quyen-user-viewmodel';
import { UserViewModel } from './../models/cadas/cms/cms-user-viewmodels';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { PagedListModel, ResponseModel } from '../model/response-model';
import { ApiResult } from '../models/common/atom/api-result';

@Injectable({
  providedIn: 'root'
})
export class UserProFileService {

  public baseUrl: string

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  // Danh sách quyền user
  public getDanhSachQuyenUser<T = ResponseModel>(params: any = null, path: string = '/api/NguoiDung/GetDanhSachQuyenByCurrentUser') {
    return this.http.get<ApiResult<Array<QuyenUserViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Danh sách quyền user
  public getInfoProfileUser<T = ResponseModel>(params: any = null, path: string = '/api/NguoiDung/GetProfileNguoiDung') {
    return this.http.get<ApiResult<Array<UserViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Danh sách đơn vị hành chính
  public getDanhSachQuyenDuLieu<T = ResponseModel>(params: any = null, path: string = '/api/NguoiDung/GetDanhSachQuyenDuLieuCayDonViHanhChinh') {
    return this.http.get<ApiResult<Array<CayDonViHanhChinhViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // API đổi mật khẩu
  public postDoiMatKhau<T = any>(body: any = null, path: string = '/api/NguoiDung/ChangePassword') {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

  // API cập nhật tên đầy đủ
  public postUpdateTenDayDu<T = any>(body: any = null, path: string = '/api/NguoiDung/UpdateNguoiDungTenDayDu') {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

}

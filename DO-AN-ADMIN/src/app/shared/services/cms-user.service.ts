import { CayDonViHanhChinhViewModel } from './../models/cadas/storage/cay-don-vi-hanh-chinh-viewmodel';
import { QuyenChucNangViewModel } from './../models/cadas/storage/quyen-chuc-nang-viewmodel';
import { ApiResult } from './../models/common/atom/api-result';
import { UserViewModel } from './../models/cadas/cms/cms-user-viewmodels';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { PagedListModel, ResponseModel } from '../model/response-model';
import { QuyenUserViewModel } from '../models/cadas/storage/quyen-user-viewmodel';

@Injectable({
  providedIn: 'root'
})
export class CmsUserService {

  public baseUrl: string

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  // Danh sách user
  public getDanhSachUser<T = ResponseModel>(params: any = null, path: string = '/api/NguoiDung/GetDanhSachAllNguoiDungAppPortal') {
    return this.http.get<ApiResult<Array<UserViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Danh sách quyền chức năng
  public getDanhSachQuyenChucNang<T = ResponseModel>(params: any = null, path: string = '/api/NguoiDung/GetDanhSachQuyenForNguoiDungInAppPortal') {
    return this.http.get<ApiResult<Array<QuyenChucNangViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Danh sách quyền user khi sửa
  public getDanhSachQuyenUserUpdate<T = ResponseModel>(params: any = null, path: string = '/api/NguoiDung/GetDanhSachQuyenKeThuaTuNhomByNguoiDung') {
    return this.http.get<ApiResult<Array<QuyenUserViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // get thông tin user theo tên đăng nhập
  public getThongTinUserTheoTenDangNhap<T = ResponseModel>(params: any = null, path: string = '/api/NguoiDung/GetProfileNguoiDungByTenDangNhap') {
    return this.http.get<ApiResult<Array<UserViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // get cây đơn vị hành chính
  public getCayDVHC<T = ResponseModel>(params: any = null, path: string = '/api/DanhMuc/GetCayDonViHanhChinhByMaTinh') {
    return this.http.get<ApiResult<Array<CayDonViHanhChinhViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // thêm mới user
  public postThemMoiUser<T = any>(body: any = null, path: string = '/api/NguoiDung/InsertNguoiDungForAppPortal') {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

  // update user
  public postUpdateUser<T = any>(body: any = null, path: string = '/api/NguoiDung/UpdateNguoiDungForAppPortal') {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

  // update quyền dữ liệu user
  public postUpdateQuyenDuLieuUser<T = any>(body: any = null, path: string = '/api/NguoiDung/InsertUpdateDanhSachQuyenDuLieu') {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

  //xóa bài viết
  public deleteUser<T = any>(params: any = null, path: string = '/api/NguoiDung/DeleteNguoiDungByTenDangNhap') {
    return this.http.delete<any>(`${this.baseUrl}${path}`, { params: params });
  }

  // API đổi mật khẩu
  public postDoiMatKhau<T = any>(body: any = null, path: string = '/api/NguoiDung/AddPassword') {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

}

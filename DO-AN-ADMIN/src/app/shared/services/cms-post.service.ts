import { ApiResult } from './../models/common/atom/api-result';
import { BaiVietViewModel } from './../models/cadas/cms/cms-post-viewmodels';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { PagedListModel, ResponseModel } from '../model/response-model';
import { SoLuongBaiVietViewModel } from '../models/cadas/storage/so-luong-bai-viet-viewmodel';
import { DanhSachChuyenMucViewModel } from '../models/cadas/storage/danh-sach-chuyen-muc-viewmodel';

@Injectable({
  providedIn: 'root'
})
export class CmsPostService {

  public baseUrl: string

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  // Danh sách bài viết
  public getDanhSachBaiViet<T = ResponseModel>(params: any = null, path: string = '/api/Cms/GetPosts') {
    return this.http.get<ApiResult<Array<BaiVietViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Count số lượng các loại bài viết
  public getCountDanhSachBaiViet<T = ResponseModel>(params: any = null, path: string = '/api/Cms/GetPostSummary') {
    return this.http.get<ApiResult<Array<SoLuongBaiVietViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Danh sách chuyên mục
  public getDanhSachChuyenMuc<T = ResponseModel>(params: any = null, path: string = '/api/Cms/GetTerms') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // get thông tin bài viết theo ID
  public getThongTinBaiVietTheoId<T = ResponseModel>(params: any = null, path: string = '/api/Cms/GetPost') {
    return this.http.get<ApiResult<Array<BaiVietViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // đăng bài viết
  public postDangBaiViet<T = any>(body: any = null, path: string = '/api/Cms/InsertPost') {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

  // update bài viết
  public postUpdateBaiViet<T = any>(body: any = null, path: string = '/api/Cms/UpdatePost') {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

  // update status bài viết
  public postUpdateStatusBaiViet<T = any>(body: any = null, path: string = '/api/Cms/UpdatePostStatus') {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

  // update date bài viết
  public postUpdateDateBaiViet<T = any>(body: any = null, path: string = '/api/Cms/UpdatePostDate') {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

  // thêm chuyên mục mới
  public postAddChuyenMuc<T = any>(body: any = null, path: string = '/api/Cms/InsUpdateTerm') {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

  //xóa bài viết
  public deleteBaiviet<T = any>(params: any = null, path: string = '/api/Cms/DeletePost') {
    return this.http.delete<any>(`${this.baseUrl}${path}`, { params: params });
  }

  //xóa nhiều bài viết
  public deleteNhieuBaiviet<T = ResponseModel>(params: any = null, path: string = '/api/Cms/DeletePosts') {
    return this.http.delete<PagedListModel>(`${this.baseUrl}${path}`, { params: params });
  }

}

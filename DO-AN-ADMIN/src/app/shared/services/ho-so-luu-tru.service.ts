import { ResponseModel } from 'app/shared/model/response-model';
import { DanhSachChuyenMucViewModel } from './../models/cadas/storage/danh-sach-chuyen-muc-viewmodel';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, EMPTY, Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { switchMap, mergeMap as _observableMergeMap, catchError as _observableCatch, first } from 'rxjs/operators';
import { HoSoLuuTruViewModel, InputSearchHoSoLuuTruViewModel } from '../models/cadas/storage/ho-so-luu-tru-viewmodel';
import { TaiLieuKemTheoHoSoDiaChinhViewModel } from '../models/cadas/storage/tai-lieu-kem-theo-viewmodel';
import { AddResultViewModel } from '../models/common/atom/add-result-viewmodel';
import { ApiResult } from '../models/common/atom/api-result';


import { TinhViewModel, HuyenViewModel, XaViewModel, DonViHanhChinhViewModel } from '../models/common/atom/don-vi-hanh-chinh-viewmodel';
import { KeyValueViewModel } from '../models/common/atom/key-value-viewmodel';
import { PagingViewmodel } from '../models/common/atom/paging-viewmodel';

import { CommonMainService } from './common-main.service';



@Injectable()
export class HoSoLuuTruService {

  public baseUrl: string

  constructor(
    private commonMain: CommonMainService,
    private http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl;
  }



  public getDanhSachHoSoLuuTruAndComponentByCondition(input: InputSearchHoSoLuuTruViewModel): Observable<ApiResult<PagingViewmodel<HoSoLuuTruViewModel>>> {
    const apiPath: string = "/api/HoSoLuuTru/SearchHoSoLuuTru";
    const requestUri = environment.apiUrl + apiPath;

    // const body = {
    //     MaXaId : maXaId,
    //     MaHoSo: null,
    //     LoaiHoSoLuuTruId : loaiHoSoLuuTruId,
    //     DonViLuuTruId:null,
    //     ThoiGianBatDau : null,
    //     ThoiGianKetThuc : null,
    //     LaGiayMoiNhat : null,
    //     PageSize : PageSize,
    //     PageIndex : PageIndex,
    // }
    //   .set(`MaXaId`, maXaId)
    //   .set(`MaHoSo`, maHoSo)
    //   .set(`LoaiHoSoLuuTruId`, loaiHoSoLuuTruId)
    //   .set(`DonViLuuTruId`, donViLuuTruId)
    //   .set(`ThoiGianBatDau`, thoiGianBatDau)
    //   .set(`ThoiGianKetThuc`, thoiGianKetThuc)
    //   .set(`LaGiayMoiNhat`, laGiayMoiNhat);


    const headers = { 'Content-Type': 'application/json; charset=utf-8' }

    return this.http.post<ApiResult<PagingViewmodel<HoSoLuuTruViewModel>>>(`${requestUri}`, input, { headers });
  }

  public getHoSoLuuTru(id: string): Observable<HoSoLuuTruViewModel> {

    const sufix: string = "/api/HoSoLuuTru/GetHoSoLuuTru";
    let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
    let item: KeyValueViewModel = null;

    if (id) {
      item = { key: "Id", value: id } as KeyValueViewModel;
      lstKeyValue.push(item);
    }

    return this.commonMain.getApi<HoSoLuuTruViewModel>(sufix, lstKeyValue);
  }

  public getDanhSachFileKemTheo(hoSoLuuTruId: string): Observable<Array<TaiLieuKemTheoHoSoDiaChinhViewModel>> {

    const sufix: string = "/api/HoSoLuuTru/GetDanhSachTaiLieuKemTheoHSDC";
    let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
    let item: KeyValueViewModel = null;

    if (hoSoLuuTruId) {
      item = { key: "hoSoLuuTruId", value: hoSoLuuTruId } as KeyValueViewModel;
      lstKeyValue.push(item);
    }

    return this.commonMain.getApi<Array<TaiLieuKemTheoHoSoDiaChinhViewModel>>(sufix, lstKeyValue);
  }

  public GetDownloadLinkTaiLieuKemTheo(id: string): Observable<AddResultViewModel> {
    const sufix: string = "/api/HoSoLuuTru/GetDownloadLinkTaiLieuKemTheo";
    let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
    let item: KeyValueViewModel = null;

    if (id) {
      item = { key: "Id", value: id } as KeyValueViewModel;
      lstKeyValue.push(item);
    }

    return this.commonMain.getApi<AddResultViewModel>(sufix, lstKeyValue);
  }

  // Thông tin hồ sơ by Id
  public getThongTinHoSoById<T = ResponseModel>(params: any = null, path: string = '/api/HoSoLuuTru/GetHoSoLuuTru') {
    return this.http.get<ApiResult<HoSoLuuTruViewModel>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Danh sách quận/huyện
  public getDanhSachQuanHuyen<T = ResponseModel>(params: any = null, path: string = '/api/DanhMuc/GetDanhSachHuyen') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Danh sách xã/phường
  public getDanhSachXaPhuong<T = ResponseModel>(params: any = null, path: string = '/api/DanhMuc/GetDanhSachXa') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get Id loại tư liệu
  public getIdLoaiTuLieu<T = ResponseModel>(params: any = null, path: string = '/api/HoSoLuuTru/GetLoaiHoSoLuuTru') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get danh sách loại tư liệu
  public getDanhSachLoaiTuLieu<T = ResponseModel>(params: any = null, path: string = '/api/HoSoLuuTru/GetDanhSachLoaiHoSoLuuTru') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get danh sách đơn vị hình thành phông
  public getDanhSachDonViHinhThanhPhong<T = ResponseModel>(params: any = null, path: string = '/api/ViTriLuuTru/GetDanhSachDonViHinhThanhPhong') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get danh sách đơn vị lưu trữ
  public getDanhSachDonViLuuTru<T = ResponseModel>(params: any = null, path: string = '/api/ViTriLuuTru/GetDanhSachDonViLuuTru') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get danh sách kho/phòng
  public getDanhSachKhoPhong<T = ResponseModel>(params: any = null, path: string = '/api/ViTriLuuTru/GetDanhSachKhoPhong') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get danh sách giá/tủ
  public getDanhSachGiaTu<T = ResponseModel>(params: any = null, path: string = '/api/ViTriLuuTru/GetDanhSachGiaKeTu') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get danh sách tầng/ngăn
  public getDanhSachTangNgan<T = ResponseModel>(params: any = null, path: string = '/api/ViTriLuuTru/GetDanhSachTangNgan') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get danh sách hộp
  public getDanhSachHop<T = ResponseModel>(params: any = null, path: string = '/api/ViTriLuuTru/GetDanhSachHopHoSo') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get danh sách ngôn ngữ
  public getDanhSachNgonNgu<T = ResponseModel>(params: any = null, path: string = '/api/DanhMuc/GetDanhSachNgonNgu') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get danh sách hồ sơ lưu trữ
  public getDanhSachHoSoLuuTru<T = ResponseModel>(params: any = null, path: string = '/api/HoSoLuuTru/GetHoSoLuuTru') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get danh sách tài liệu kèm theo
  public getDanhSachTaiLieuKemTheo<T = ResponseModel>(params: any = null, path: string = '/api/HoSoLuuTru/GetDanhSachTaiLieuKemTheoHSDC') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get danh sách tài liệu kèm theo by ID
  public getDanhSachTaiLieuKemTheoById<T = ResponseModel>(params: any = null, path: string = '/api/HoSoLuuTru/GetTaiLieuKemTheoHSDC') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get thông tin xã theo id
  public getInfoXaById<T = ResponseModel>(params: any = null, path: string = '/api/DanhMuc/GetXa') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get thông tin huyện theo id xã
  public getInfoHuyenByMaHuyen<T = ResponseModel>(params: any = null, path: string = '/api/DanhMuc/GetHuyen') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get tên ngôn ngữ
  public getTenNgonNgu<T = ResponseModel>(params: any = null, path: string = '/api/DanhMuc/GetNgonNgu') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get link upload file
  public getLinkUpLoadFile<T = ResponseModel>(params: any = null, path: string = '/api/HoSoLuuTru/GetUploadLinkTaiLieuKemTheo') {
    return this.http.get<ApiResult<Array<DanhSachChuyenMucViewModel>>>(`${this.baseUrl}${path}`, { params: params });
  }

  // Get current index mã hồ sơ
  public getCurrentIndexOfMaHoSoSo<T = ResponseModel>(params: any = null, path: string = '/api/HoSoLuuTru/GetCurrentIndexOfMaHoSoSo') {
    return this.http.get<ApiResult<string>>(`${this.baseUrl}${path}`, { params: params });
  }

  // thêm mới hồ sơ
  public postThemMoiHoSo<T = any>(body: any = null, path: string = '/api/HoSoLuuTru/InsUpdateHoSoLuuTru') {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

  // thêm mới/update tài liệu kèm theo
  public postAddUpdateTaiLieuKemTheo<T = any>(body: any = null, path: string = '/api/HoSoLuuTru/InsertUpdateTaiLieuKemTheoHSDC') {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

  // update hồ sơ
  public postUpdateMoiHoSo<T = any>(body: any = null, path: string = '/api/HoSoLuuTru/UpdateHoSoLuuTruAndTaiLieuKemTheoWithMoveFile') {
    return this.http.post<any>(`${this.baseUrl}${path}`, body);
  }

  //xóa tài liệu kèm theo
  public deleteTaiLieuKemTheo<T = any>(params: any = null, path: string = '/api/HoSoLuuTru/DeleteTaiLieuKemTheoHSDC') {
    return this.http.delete<any>(`${this.baseUrl}${path}`, { params: params });
  }
}


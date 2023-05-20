import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HoSoKhaiThacThanhPhanHoSoViewModel } from '../models/cadas/storage/ho-so-khai-thac-thanh-phan-ho-so-viewmodel';
import { HoSoKhaiThacViewModel, InputSearchHoSoKhaiThacViewModel } from '../models/cadas/storage/ho-so-khai-thac-viewmodel';
import { AddResultViewModel } from '../models/common/atom/add-result-viewmodel';
import { ApiResult } from '../models/common/atom/api-result';
import { KeyValueViewModel } from '../models/common/atom/key-value-viewmodel';
import { PagingViewmodel } from '../models/common/atom/paging-viewmodel';
import { CommonMainService } from './common-main.service';

@Injectable({
  providedIn: 'root'
})
export class HoSoKhaiThacService {

  public baseUrl: string

  constructor(
    private commonMain: CommonMainService,
    private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  public insUpdateHoSoKhaiThacAndThanhPhanHoSo(data: HoSoKhaiThacViewModel): Observable<ApiResult<AddResultViewModel>> {
    const apiPath: string = "/api/HoSoKhaiThac/InsUpdateHoSoKhaiThacAndThanhPhanHoSo";
    const requestUri = environment.apiUrl + apiPath;

    const headers = { 'Content-Type': 'application/json; charset=utf-8' }

    return this.http.post<ApiResult<AddResultViewModel>>(`${requestUri}`, data, { headers });
  }

  public insUpdateHoSoKhaiThacAndThanhPhanHoSoByCurrentUser(data: HoSoKhaiThacViewModel): Observable<ApiResult<AddResultViewModel>> {
    const apiPath: string = "/api/HoSoKhaiThac/InsUpdateHoSoKhaiThacAndThanhPhanHoSoByCurrentUser";
    const requestUri = environment.apiUrl + apiPath;

    const headers = { 'Content-Type': 'application/json; charset=utf-8' }

    return this.http.post<ApiResult<AddResultViewModel>>(`${requestUri}`, data, { headers });
  }
  public duyetHoSoKhaiThac(data: HoSoKhaiThacViewModel): Observable<ApiResult<AddResultViewModel>> {
    const apiPath: string = "/api/HoSoKhaiThac/DuyetHoSoKhaiThac";
    const requestUri = environment.apiUrl + apiPath;

    const headers = { 'Content-Type': 'application/json; charset=utf-8' }

    return this.http.post<ApiResult<AddResultViewModel>>(`${requestUri}`, data, { headers });
  }

  public traHoSoKhaiThac(data: HoSoKhaiThacViewModel): Observable<ApiResult<AddResultViewModel>> {
    const apiPath: string = "/api/HoSoKhaiThac/TraHoSoKhaiThac";
    const requestUri = environment.apiUrl + apiPath;

    const headers = { 'Content-Type': 'application/json; charset=utf-8' }

    return this.http.post<ApiResult<AddResultViewModel>>(`${requestUri}`, data, { headers });
  }

  public getHoSoKhaiThac(id: string, tenDangNhapNguoiLapHoSo: string, trangThaiHoSo: string): Observable<HoSoKhaiThacViewModel> {

    const sufix: string = "/api/HoSoKhaiThac/GetHoSoKhaiThac";
    let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
    let item: KeyValueViewModel = null;

    if (id) {
      item = { key: "Id", value: id } as KeyValueViewModel;
      lstKeyValue.push(item);
    }
    if (trangThaiHoSo) {
      item = { key: "TrangThaiHoSo", value: trangThaiHoSo } as KeyValueViewModel;
      lstKeyValue.push(item);
    }
    if (tenDangNhapNguoiLapHoSo) {
      item = { key: "TenDangNhapNguoiLapHoSo", value: tenDangNhapNguoiLapHoSo } as KeyValueViewModel;
      lstKeyValue.push(item);
    }

    return this.commonMain.getApi<HoSoKhaiThacViewModel>(sufix, lstKeyValue);
  }

  public searchDanhSachHoSoKhaiThacPaging(input: InputSearchHoSoKhaiThacViewModel): Observable<ApiResult<PagingViewmodel<HoSoKhaiThacViewModel>>> {
    const apiPath: string = "/api/HoSoKhaiThac/SearchDanhSachHoSoKhaiThac";
    const requestUri = environment.apiUrl + apiPath;
    const headers = { 'Content-Type': 'application/json; charset=utf-8' }

    return this.http.post<ApiResult<PagingViewmodel<HoSoKhaiThacViewModel>>>(`${requestUri}`, input, { headers });
  }

  public searchDanhSachHoSoKhaiThacPagingForNguoiLapByCurrentUser(input: InputSearchHoSoKhaiThacViewModel): Observable<ApiResult<PagingViewmodel<HoSoKhaiThacViewModel>>> {
    const apiPath: string = "/api/HoSoKhaiThac/SearchDanhSachHoSoKhaiThac4NguoiLapByCurrentUser";
    const requestUri = environment.apiUrl + apiPath;
    const headers = { 'Content-Type': 'application/json; charset=utf-8' }

    return this.http.post<ApiResult<PagingViewmodel<HoSoKhaiThacViewModel>>>(`${requestUri}`, input, { headers });
  }

  public searchDanhSachHoSoKhaiThacPagingForNguoiDuyetByCurrentUser(input: InputSearchHoSoKhaiThacViewModel): Observable<ApiResult<PagingViewmodel<HoSoKhaiThacViewModel>>> {
    const apiPath: string = "/api/HoSoKhaiThac/SearchDanhSachHoSoKhaiThac4NguoiDuyetByCurrentUser";
    const requestUri = environment.apiUrl + apiPath;
    const headers = { 'Content-Type': 'application/json; charset=utf-8' }

    return this.http.post<ApiResult<PagingViewmodel<HoSoKhaiThacViewModel>>>(`${requestUri}`, input, { headers });
  }


  public insUpdateThanhPhanHoSoKhaiThac(data: HoSoKhaiThacThanhPhanHoSoViewModel): Observable<ApiResult<AddResultViewModel>> {
    const apiPath: string = "/api/HoSoKhaiThac/InsUpdateThanhPhanHoSoKhaiThac";
    const requestUri = environment.apiUrl + apiPath;
    const headers = { 'Content-Type': 'application/json; charset=utf-8' }

    return this.http.post<ApiResult<AddResultViewModel>>(`${requestUri}`, data, { headers });
  }
  public deleteHoSoKhaiThac(params: any = null, path: string = '/api/HoSoKhaiThac/DeleteHoSoKhaiThac') {
    const requestUri = environment.apiUrl + path;
    return this.http.delete<any>(`${requestUri}`, { params: params });
  }


  public GetPrintHoSoKhaiThac(id: string): Observable<string> {

    const sufix: string = "/api/HoSoKhaiThac/GetPrintHoSoKhaiThac";
    let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
    let item: KeyValueViewModel = null;

    if (id) {
      item = { key: "Id", value: id } as KeyValueViewModel;
      lstKeyValue.push(item);
    }

    return this.commonMain.getApi<string>(sufix, lstKeyValue);
  }

  //xóa hồ sơ lưu trữ
  public deleteHoSoLuuTru<T = any>(params: any = null, path: string = '/api/HoSoLuuTru/DeleteHoSoLuuTru') {
    return this.http.delete<any>(`${this.baseUrl}${path}`, { params: params });
  }
}

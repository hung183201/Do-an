import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HoSoKhaiThacThanhPhanHoSoViewModel } from '../models/cadas/storage/ho-so-khai-thac-thanh-phan-ho-so-viewmodel';
import { HoSoKhaiThacViewModel, InputSearchHoSoKhaiThacViewModel } from '../models/cadas/storage/ho-so-khai-thac-viewmodel';
import { InputSearchPhieuYeuCauKhaiThacViewModel, PhieuYeuCauKhaiThacHoSoLuuTruViewmodel, PhieuYeuCauKhaiThacViewmodel } from '../models/cadas/storage/phieu-yeu-cau-khai-thac-viewmodel';
import { AddResultViewModel } from '../models/common/atom/add-result-viewmodel';
import { ApiResult } from '../models/common/atom/api-result';
import { KeyValueViewModel } from '../models/common/atom/key-value-viewmodel';
import { PagingViewmodel } from '../models/common/atom/paging-viewmodel';
import { CommonMainService } from './common-main.service';

@Injectable({
  providedIn: 'root'
})
export class PhieuYeuCauKhaiThacService {

  constructor(private commonMain: CommonMainService,
    private http: HttpClient) { }

    public insUpdatePhieuYeuCauKhaiThac(data: PhieuYeuCauKhaiThacViewmodel ): Observable<ApiResult<AddResultViewModel>> {
        const apiPath: string = "/api/PhieuYeuCauKhaiThac/InsUpdatePhieuYeuCauKhaiThac";
        const requestUri = environment.apiUrl + apiPath;

    const headers = {  'Content-Type': 'application/json; charset=utf-8' }

    return this.http.post<ApiResult<AddResultViewModel>>(`${requestUri}`, data, {headers});
  }

  public getPhieuYeuCauKhaiThac (id: string, tenDangNhapNguoiLapPhieu : string, trangThaiPhieu : string): Observable<PhieuYeuCauKhaiThacViewmodel> {

    const sufix: string = "/api/PhieuYeuCauKhaiThac/GetPhieuYeuCauKhaiThac";
    let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
    let item: KeyValueViewModel = null;

    if (id) {
      item = { key: "Id", value: id } as KeyValueViewModel;
      lstKeyValue.push(item);
    }
    if (trangThaiPhieu) {
      item = { key: "trangThaiPhieu", value: trangThaiPhieu } as KeyValueViewModel;
      lstKeyValue.push(item);
    }
    if (tenDangNhapNguoiLapPhieu) {
      item = { key: "tenDangNhapNguoiYeuCau", value: tenDangNhapNguoiLapPhieu } as KeyValueViewModel;
      lstKeyValue.push(item);
    }

    return this.commonMain.getApi<PhieuYeuCauKhaiThacViewmodel>(sufix, lstKeyValue);
  }

  public searchDanhSachPhieuYeuCauKhaiThacPaging(input : InputSearchPhieuYeuCauKhaiThacViewModel): Observable<ApiResult<PagingViewmodel<PhieuYeuCauKhaiThacViewmodel>>> {
    const apiPath: string = "/api/PhieuYeuCauKhaiThac/SearchDanhSachPhieuYeuCauKhaiThac";
    const requestUri = environment.apiUrl + apiPath;
  const headers = {  'Content-Type': 'application/json; charset=utf-8' }

  return this.http.post<ApiResult<PagingViewmodel<PhieuYeuCauKhaiThacViewmodel>>>(`${requestUri}`, input, { headers });
  }

  public insertUpdatePhieuYeuCauKhaiThacHoSoLuuTru(data: PhieuYeuCauKhaiThacHoSoLuuTruViewmodel ): Observable<ApiResult<AddResultViewModel>> {
    const apiPath: string = "/api/PhieuYeuCauKhaiThac/InsertUpdatePhieuYeuCauKhaiThacHoSoLuuTru";
    const requestUri = environment.apiUrl + apiPath;
  const headers = {  'Content-Type': 'application/json; charset=utf-8' }

  return this.http.post<ApiResult<AddResultViewModel>>(`${requestUri}`, data, {headers});
  }
}

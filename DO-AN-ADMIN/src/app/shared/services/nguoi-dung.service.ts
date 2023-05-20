import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HoSoKhaiThacThanhPhanHoSoViewModel } from '../models/cadas/storage/ho-so-khai-thac-thanh-phan-ho-so-viewmodel';
import { HoSoKhaiThacViewModel } from '../models/cadas/storage/ho-so-khai-thac-viewmodel';
import { ProfileNguoiDungViewModel } from '../models/common/account/profile-nguoi-dung-viewmodel';
import { AddResultViewModel } from '../models/common/atom/add-result-viewmodel';
import { ApiResult } from '../models/common/atom/api-result';
import { KeyValueViewModel } from '../models/common/atom/key-value-viewmodel';
import { CommonMainService } from './common-main.service';

@Injectable({
  providedIn: 'root'
})
export class NguoiDungService {

constructor(private commonMain: CommonMainService,
  private http: HttpClient) { }

  

public getDanhSachNguoiDung (): Observable<Array<ProfileNguoiDungViewModel>> {

  const sufix: string = "/api/NguoiDung/GetDanhSachNguoiDung";
  let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
  let item: KeyValueViewModel = null;



  return this.commonMain.getApi<Array<ProfileNguoiDungViewModel>>(sufix, lstKeyValue);
}

public getDanhSachNguoiDungByPhongBanId (maPhong : string): Observable<Array<ProfileNguoiDungViewModel>> {

  const sufix: string = "/api/NguoiDung/GetDanhSachNguoiDungByPhongBanId";
  let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
  let item: KeyValueViewModel = null;

  if (maPhong) {
    item = { key: "maPhong", value: maPhong } as KeyValueViewModel;
    lstKeyValue.push(item);
  }

  return this.commonMain.getApi<Array<ProfileNguoiDungViewModel>>(sufix, lstKeyValue);
}


}

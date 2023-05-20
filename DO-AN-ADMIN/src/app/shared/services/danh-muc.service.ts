
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { switchMap, mergeMap as _observableMergeMap, catchError as _observableCatch, first } from 'rxjs/operators';


import { TinhViewModel, HuyenViewModel, XaViewModel, DonViHanhChinhViewModel } from '../models/common/atom/don-vi-hanh-chinh-viewmodel';
import { KeyValueViewModel } from '../models/common/atom/key-value-viewmodel';

import { CommonMainService } from './common-main.service';



@Injectable()
export class DanhMucService {

  constructor(private commonMain: CommonMainService) {

  }

  /**
   * Lấy đơn vị hành chính theo mã duy nhất (madvhc hoặc maXa)
   * @param madvhc
   * @param maXa
   */
  public getDonViHanhChinh(madvhc?: number, maXa?: number): Observable<DonViHanhChinhViewModel> {

    const sufix: string = "api/DanhMuc/GetDonViHanhChinh";
    let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
    let item: KeyValueViewModel = null;
    if (madvhc && madvhc > 0) {
      item = { key: "madvhc", value: madvhc.toString() } as KeyValueViewModel;
      lstKeyValue.push(item);
    }
    if (maXa && maXa > 0) {
      item = { key: "maXa", value: maXa.toString() } as KeyValueViewModel;
      lstKeyValue.push(item);
    }

    return this.commonMain.getApi<DonViHanhChinhViewModel>(sufix, lstKeyValue);
  }

  public getDanhSachDonViHanhChinh(maTinh: number): Observable<Array<DonViHanhChinhViewModel>> {

    const sufix: string = "api/DanhMuc/GetDanhSachDonViHanhChinh";
    let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
    let item: KeyValueViewModel = null;

    item = { key: "maTinh", value: maTinh.toString() } as KeyValueViewModel;
    lstKeyValue.push(item);

    return this.commonMain.getApi<Array<DonViHanhChinhViewModel>>(sufix, lstKeyValue);
  }

  /**
   * Lấy tỉnh theo mã duy nhất (TinhId hoặc MaTinh)
   * @param madvhc
   * @param maTinh
   */
  public getTinh(madvhc?: number, maTinh?: number): Observable<TinhViewModel> {

    const sufix: string = "/api/DanhMuc/GetTinh";
    let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
    let item: KeyValueViewModel = null;
    if (madvhc && madvhc > 0) {
      item = { key: "madvhc", value: madvhc.toString() } as KeyValueViewModel;
      lstKeyValue.push(item);
    }
    if (maTinh && maTinh > 0) {
      item = { key: "maTinh", value: maTinh.toString() } as KeyValueViewModel;
      lstKeyValue.push(item);
    }
    return this.commonMain.getApi<TinhViewModel>(sufix, lstKeyValue);
  }

  public getDanhSachTinh(danhSachMaTinh: string): Observable<Array<TinhViewModel>> {

    const sufix: string = "api/DanhMuc/GetDanhSachTinh";
    let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
    let item: KeyValueViewModel = null;

    item = { key: "danhSachMaTinh", value: danhSachMaTinh } as KeyValueViewModel;
    lstKeyValue.push(item);

    return this.commonMain.getApi<Array<TinhViewModel>>(sufix, lstKeyValue);
  }

  /**
   * Lấy huyện theo mã duy nhất (HuyenId hoặc MaHuyen)
   * @param maHuyen
   */
  public getHuyen(maHuyen?: number): Observable<HuyenViewModel> {

    const sufix: string = "/api/DanhMuc/GetHuyen";
    let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
    let item: KeyValueViewModel = null;
   
    if (maHuyen && maHuyen > 0) {
      item = { key: "maHuyen", value: maHuyen.toString() } as KeyValueViewModel;
      lstKeyValue.push(item);
    }
    return this.commonMain.getApi<HuyenViewModel>(sufix, lstKeyValue);
  }

  /**
   * Lấy danh sách huyện theo Id Tỉnh (guid) hoặc Mã tỉnh (int) hoặc Danh sách mã huyện
   * @param danhSachMaHuyen Mảng int phân cách bằng dấu phẩy (dùng khi hai param còn lại null, ưu tiên 3)
   * @param maTinh Int (dùng khi hai param còn lại null, ưu tiên 2)
   */
  public getDanhSachHuyen(danhSachMaHuyen: string, maTinh?: number): Observable<Array<HuyenViewModel>> {

    const sufix: string = "api/DanhMuc/GetDanhSachHuyen";
    let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
    let item: KeyValueViewModel = null;

    if (danhSachMaHuyen) {
      item = { key: "danhSachMaHuyen", value: danhSachMaHuyen } as KeyValueViewModel;
      lstKeyValue.push(item);
    }

    if (maTinh && maTinh > 0) {
      item = { key: "maTinh", value: maTinh.toString() } as KeyValueViewModel;
      lstKeyValue.push(item);
    }
    

    return this.commonMain.getApi<Array<HuyenViewModel>>(sufix, lstKeyValue);
  }


  /**
   * Lấy xã theo mã duy nhất (XaId hoặc MaXa)
   * @param maGuid
   * @param maXa
   */
  public getXa(maGuid: string, maXa?: number): Observable<XaViewModel> {

    const sufix: string = "/api/DanhMuc/GetXa";
    let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
    let item: KeyValueViewModel = null;

    if (maGuid) {
      item = { key: "maGuid", value: maGuid } as KeyValueViewModel;
      lstKeyValue.push(item);
    }

    if (maXa && maXa > 0) {
      item = { key: "maXa", value: maXa.toString() } as KeyValueViewModel;
      lstKeyValue.push(item);
    }
  
    return this.commonMain.getApi<XaViewModel>(sufix, lstKeyValue);
  }

 
  public getDanhSachXa(danhSachMaXa: string, maHuyen?: number): Observable<Array<XaViewModel>> {

    const sufix: string = "api/DanhMuc/GetDanhSachXa";
    let lstKeyValue: Array<KeyValueViewModel> = new Array<KeyValueViewModel>();
    let item: KeyValueViewModel = null;

    if (danhSachMaXa) {
      item = { key: "danhSachMaXa", value: danhSachMaXa } as KeyValueViewModel;
      lstKeyValue.push(item);
    }
    if (maHuyen && maHuyen > 0) {
      item = { key: "maHuyen", value: maHuyen.toString() } as KeyValueViewModel;
      lstKeyValue.push(item);
    }

    return this.commonMain.getApi<Array<XaViewModel>>(sufix, lstKeyValue);
  }


}


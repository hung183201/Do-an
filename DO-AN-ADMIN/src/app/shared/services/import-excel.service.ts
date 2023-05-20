import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';


import { CommonMainService } from './common-main.service';
import * as internal from 'assert';
import { ResponseModel } from '../model/response-model';
import { DanhSachChuyenMucViewModel } from '../models/cadas/storage/danh-sach-chuyen-muc-viewmodel';
import { ApiResult } from '../models/common/atom/api-result';
import { ImportExcelStatusViewModel, ImportTaiLieuKemTheoHSDC, InputSearchDSImportExcel } from '../models/cadas/storage/danh-sach-import-excel-viewmodel';
import { PagingViewmodel } from '../models/common/atom/paging-viewmodel';


@Injectable()
export class ImportExcelService {
  public baseUrl: string
  constructor(
    private commonMain: CommonMainService,
    private http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl;
  }

  public postImportHoSoLuuTru<T = any>(idXa: string,isDelete: boolean,isSkip: boolean,body: any , path: string = '/api/ImportExcel/ImportHoSoLuuTru' ) {
    return this.http.post<any>(`${this.baseUrl}${path}?xaId=`+idXa+'&isDelete='+isDelete+'&isSkip='+isSkip, body);
  }

  public ImportExcelStatusViewModel<T = ResponseModel>(params: InputSearchDSImportExcel, path: string = '/api/ImportExcel/GetDanhSachImportExcelStatus') {
     return this.http.get<ApiResult<PagingViewmodel<ImportExcelStatusViewModel>>>(`${this.baseUrl}${path}?xaId=`+params.xaId+'&fileStatus='+params.fileStatus
     +'&importType='+params.importType
     +'&PageNumber='+params.PageNumber+'&pageSize='+params.pageSize);
  }

  public GetImportExcelStatus<T = ResponseModel>(params: InputSearchDSImportExcel, path: string = '/api/ImportExcel/GetImportExcelStatus') {
    return this.http.get<ApiResult<ImportExcelStatusViewModel>>(`${this.baseUrl}${path}?xaId=`+params.xaId+'&fileStatus='+params.fileStatus
    +'&importType='+params.importType+'&fileName='+params.fileName);
 }
  public ImportTaiLieuKemTheoHSDC<T = ResponseModel>(params: ImportTaiLieuKemTheoHSDC, path: string = '/api/ImportExcel/ImportTaiLieuKemTheoHSDC'){
    return this.http.post<any>(`${this.baseUrl}${path}?xaId=`+params.xaId+'&isDelete='+params.isDelete+'&isSkip='
    +params.isSkip+'&isImportWithFileScan='+params.isImportWithFileScan+'&serverFolderUploadPath='+params.serverFolderUploadPath, params.file );
  }
}
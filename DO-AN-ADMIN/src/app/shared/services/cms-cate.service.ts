import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { PagingViewmodel } from '../models/common/atom/paging-viewmodel';
import { NhomBaiVietViewModel } from '../models/cadas/cms/cms-cate-viewmodels';
import { ApiResult } from '../models/common/atom/api-result';
import { AddResultViewModel } from '../model/addResultViewModel';

@Injectable({
    providedIn: 'root'
})
export class CmsCateService {
    public baseUrl: string
    constructor(private http: HttpClient) {
        this.baseUrl = environment.apiUrl;
    }

    public getDanhSachNhomBaiViet(params: any = null, path: string = '/api/Cms/GetTerms') {
        return this.http.get<ApiResult<PagingViewmodel<NhomBaiVietViewModel>>>(`${this.baseUrl}${path}`, { params: params });
    }

    public getEditNhomBaiViet(params: any = null, path: string = '/api/Cms/GetTerm') {
        return this.http.get<ApiResult<NhomBaiVietViewModel>>(`${this.baseUrl}${path}`, { params: params });
    }

    public insUpdateNhomBaiViet(params: any = null, path: string = '/api/Cms/InsUpdateTerm') {
        const headers = { 'Content-Type': 'application/json; charset=utf-8' }
        return this.http.post<ApiResult<AddResultViewModel>>(`${this.baseUrl}${path}`, params, { headers });
    }

    public deleteNhomBaiViet(params: any = null, path: string = '/api/Cms/DeleteTerm') {
        return this.http.delete<any>(`${this.baseUrl}${path}`, { params: params });
    }

    public deleteNhieuNhomBaiViet(params: any = null, path: string = '/api/Cms/DeleteTerms') {
        return this.http.delete<any>(`${this.baseUrl}${path}`, { params: params });
    }
}


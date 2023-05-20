
export class ResponseModel<T = PagedListModel> {
  result!: T;
  error?: any[];
  success?: boolean;
}

export interface PagingModel {
  page?: number;
  size?: number;
  count?: number;
  order?: string;
  loadMore?: boolean;
  donVi?: string ;
  donViSuDung?: string ;
  searchText?:string;
  id ?:number;
  path ?: string;
  sort ?: string;
  maChiBoSinhHoatDang ?:string;
  valueSearch ?:string;

}

export interface PagedListModel<T=any> {
  data: T[] | [];
  paging: PagingModel;
}

export interface ErrorModel {
  key: string;
  value: any;
}

import { PipeTransform, TemplateRef } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { TableColumn, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

export const PagingDefault = {
  pageSizeOptions: [10, 20, 50, 100],
  pageIndex: 1,
  pageSize: 20
};
export class BasePermission {
  hasCreateRight: true;
  hasUpdateRights: true;
  hasDeleteRights: true;
  hasViewRights: true;
}
export interface KeyValuePair<T> {
  key: string;
  value: T;
}

export interface IModalOptions {
  title: string;
  message?: string;
  template?: any;
}
export enum FieldTypes {
  Textbox = 'input',
  FileUpload = 'file',
  Editor = 'editor',
  Password = 'password',
  Email = 'email',
  Number = 'number',
  Date = 'date',
  Time = 'time',
  Textarea = 'textarea',
  Radiolist = 'radiolist',
  Select = 'select',
  Checkbox = 'checkbox',
  Checkboxlist = 'checkboxlist',
  Button = 'button',
  Template = 'template'
}

export interface Field {
  config: IFieldConfig;
}
export interface IFieldConfig {
  name: string;
  label?: string;
  disabled?: boolean;
  options?: IOption[];
  placeholder?: string;
  type: FieldTypes;
  validation?: ValidatorFn[];
  value?: any;
  patternValue?: RegexTypes;
  onSubmit?: Function;
  onChange?: Function;
  errorMessages?: Object;
  pipe?: PipeTransform;
  templateReference?: TemplateRef<any>;
}

export interface IOption {
  key: string | number;
  value: string;
  code?: string;
  groupBy?: string;
  selected?: boolean;
}

export interface ITab {
  id: string;
  name: string;
  url: string;
}

export interface ITreeSelect {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: ITreeSelect[];
}

export enum RegexTypes {
  Mobile = '[0-9+]{9,12}$',
  Email = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$',
  UserName = '[a-z0-9_.-]{2,40}$',
  Default = '^[^~!@#$%^&<>\\\]\\["]*$',
  URL = '[a-zA-Z0-9@:%\+.~#()?&//=_.-]{2,400}$',
  MaQuyTrinh = '[a-zA-Z0-9_.-]{2,200}$',
  MaThuTuc = '[a-zA-Z0-9_.-]{4,200}$',
  MaLinhVuc = '[a-zA-Z0-9_.-]{1,200}$',
  Password = '[a-zA-Z0-9@:%\+.~!#()?&//=_.-]{2,30}$',
}

export interface ITableColumn extends TableColumn {
  fieldType?: FieldTypes;
  fieldTemplateReference?: TemplateRef<any>;
  fieldOptions?: IOption[];
  fieldTreeNodes?: ITreeSelect[];
  fieldDisable?: boolean;
  fieldPatternValue?: RegexTypes;
  fieldEditHidden?: boolean;
  fieldCreateHidden?: boolean;
  fieldViewHidden?: boolean;
  fieldValidations?: ValidatorFn[];
  onChange?: Function;
  onClick?: Function;
}

export class Paging {
  // The number of elements in the page
  pageSize: number = PagingDefault.pageSize;
  // The total number of elements
  totalCount: number = 0;
  // The total number of pages
  totalPages: number = 0;
  // The current page number
  pageIndex: number = PagingDefault.pageIndex;
}

export interface IAppTableOptions<T> {
  title?: string;
  isIndex?: string;
  disableIndex?: boolean;
  rows?: Array<T>;
  columns?: ITableColumn[];
  disableEditing?: boolean;
  disableFilter?: boolean;
  apiUrl?: string;
  detailsTemplate?: TemplateRef<any>;
  columnMode: ColumnMode;
  pagingOption: Paging;

}


export interface IPageTree {
  id: string;
  name: string;
  children: IPageTree[];
  pageId: string;
}
export enum Status {
  Active,
  Deactive,
  Deleted
}
export enum DateFormat {
  Ngay = 'dd/MM/yyyy',
  NgayGioPhutGiay = 'dd/MM/yyyy HH:mm:ss',
  NgayGioPhut = 'dd/MM/yyyy HH:mm'
}

export enum DateDelimiter {
  Delimiter = '/'
}

export class BaseFileUpload {
  fileName: string;
  fileType: string;
  fileData: any;
  filePreviewData: any;
}

export class FileUploadMinio extends BaseFileUpload {
  idLoaiGiayTo?: number;
  idHoSoLoaiGiayTo?: string;
  id?: string | undefined;
}
export class FileDinhKemBuocXuLy {
  idVanBan?: string | undefined;
  idHoSo?: string | undefined;
  idBuocXuLy?: string | undefined;
  tenVanBan?: string | undefined;
  fileDinhKems?: FileUploadMinio[] | undefined;
}

export enum FormMode {
  Add = 'Add',
  View = 'View',
  Edit = 'Edit',
  OnlyView = 'OnlyView',
}

export interface IDataDvcWithLpm {
  id?: string | undefined;
  ma?: string | undefined;
  ten?: string | undefined;
  idLpm?: string | string[] | undefined;
  maLPM?: string | undefined;
  tenLPM?: string | undefined;
  idDvhcLPM?: string | undefined;
  idQuyTrinhLpm?: string | undefined;
  idThuTucDvc?: string | undefined;
  idQuyTrinhDvc?: string | undefined;
}

export interface DataDvcWithLpm extends IDataDvcWithLpm {
  dataQuyTrinhLPM?: IOption[] | undefined;
  chucNangKT?: string | undefined;
  tenChucNangKT?: string | undefined;
}

export interface IFileDinhKemViewModel {
  id?: string | undefined;
  idHoSo?: string | undefined;
  idHoSoLoaiGiayTo?: string | undefined;
  tenFile?: string | undefined;
  moTa?: string | undefined;
  link?: string | undefined;
  laNguoiDanNop?: number;
  idVanBanXuLy?: string | undefined;
  tenVanBanXuLy?: string | undefined;
}

export interface IHoSoLoaiGiayToViewModel {
  id?: string | undefined;
  idHoSo?: string | undefined;
  idLoaiGiayTo?: number;
  soBanChinh?: number;
  soBanSao?: number;
  soBanChinhHienCo?: number;
  soBanSaoHienCo?: number;
  tenLoaiGiayTo?: string | undefined;
}


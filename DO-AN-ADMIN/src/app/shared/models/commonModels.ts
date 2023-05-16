import { KieuCauHinhBuoc, NhanThongBao, HoSoSearchType, BuocXuLySearchType, ChuyenBuocXuLyNguoiXuLyCommand, FileDinhKem } from './../../api-lpm-client';
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

export interface IHoSoDoiTuongKhaiThacViewModel {
  id?: string | undefined;
  idHoSo?: string | undefined;
  IdDoiTuongKhaiThac?: string | undefined;
  hoTen?: string | undefined;
  soDienThoai?: string | undefined;
  email?: string | undefined;
  diaChi?: string | undefined;
  NhanSMS?: NhanThongBao;
  NhanEmail?: NhanThongBao;
}

export class IFilterHoSoModel {
  idLinhVuc?: string | undefined;
  idThuTuc?: string | undefined;
  idQuyTrinh?: string | undefined;
  idTrangThaiHoSo?: number | undefined;
  idTrangThaiThucHienHoSo?: number | undefined;
  idTrangThaiXuLy?: number | undefined;
  idLoaiHoSo?: number | undefined;
  hoSoSearchType?: HoSoSearchType;
  tuNgay?: Date | undefined;
  denNgay?: Date | undefined;
  ngayHenTraTuNgay?: Date | undefined;
  ngayHenTraDenNgay?: Date | undefined;
  ngayThucTraDenNgay?: Date | undefined;
  ngayThucTraTuNgay?: Date | undefined;
  idHuyen?: string | undefined;
  idPhuongXa?: string | undefined;
  dsIdCanBoXuLy?: string[] | undefined;
  isTonKyTruoc?: boolean | undefined;
  isChiTietGiaoDich?: boolean | undefined;
}

export class IFilterCongViecModel {
  idLinhVuc?: string | undefined;
  idThuTuc?: string | undefined;
  idQuyTrinh?: string | undefined;
  idTrangThaiThucHien?: string | undefined;
  idTrangThaiXuLy?: number | undefined;
  idLoaiHoSo?: string | undefined;
  searchType?: BuocXuLySearchType;
  tuNgay?: Date | undefined;
  denNgay?: Date | undefined;
  idHuyen?: string | undefined;
  idPhuongXa?: string | undefined;
  dsIdCanBoXuLy?: string[] | undefined;
  isTonKyTruoc?: boolean | undefined;
}

export class ButtonXuLy {
  icon: string;
  class: string;
  text: string;
  value: string;
  isRequireLyDo?: boolean;
  id: number;
  onClick?: any;
  orderNumber?: number;
}
``
export const NghiepVuButtons: Array<ButtonXuLy> = [
  { icon: 'ft-send', class: 'btn-primary', text: 'Nhận xử lý', value: 'NHAN_XU_LY', id: 1, orderNumber: 1, isRequireLyDo: false },
  { icon: 'fa fa-tags', class: 'btn-danger', text: 'Chuyển trả', value: 'CHUYEN_TRA', id: 2, orderNumber: 2, isRequireLyDo: true },
  { icon: 'fa fa-clock-o', class: 'btn-primary', text: 'Tạm dừng', value: 'TAM_DUNG', id: 3, orderNumber: 3, isRequireLyDo: true },
  { icon: 'fa fa-times', class: 'btn-danger', text: 'Hủy', value: 'HUY', id: 4, orderNumber: 4, isRequireLyDo: true },
  { icon: 'fa fa-play-circle-o', class: 'btn-primary', text: 'Xử lý tiếp', value: 'XU_LY_TIEP', id: 5, orderNumber: 5, isRequireLyDo: false },
  { icon: 'fa fa-check', class: 'btn-primary', text: 'Hoàn thành xử lý', value: 'HOAN_THANH_XU_LY', id: 6, orderNumber: 6, isRequireLyDo: false },
  { icon: 'fa fa-road', class: 'btn-info', text: 'Chuyển xử lý', value: 'CHUYEN_BUOC', id: 7, orderNumber: 7, isRequireLyDo: false },
  // { icon: 'fa fa-envelope-o', class: 'btn-primary', text: 'Thêm ý kiến xử lý', value: 'THEM_Y_KIEN_XU_LY', id: 8 },
  // { icon: 'ft-send', class: 'btn-primary', text: 'Tiếp nhận hồ sơ', value: 'TIEP_NHAN_HO_SO', id: 9 },
  // { icon: 'fa fa-envelope-o', class: 'btn-primary', text: 'Thêm ý kiến xử lý', value: 'PHAN_CONG_LAI', id: 10 },
  { icon: 'ft-shuffle', class: 'btn-primary', text: 'Y/c phân công lại', value: 'YEU_CAU_PHAN_CONG_LAI', id: 11, orderNumber: 11, isRequireLyDo: true },
  { icon: 'fa fa-tags', class: 'btn-primary', text: 'Y/c nội bộ', value: 'YEU_CAU_NOI_BO', id: 12, orderNumber: 12, isRequireLyDo: true },
  { icon: 'fa fa-play-circle-o', class: 'btn-primary', text: 'Thu hồi y/c nội bộ', value: 'XU_LY_YEU_CAU_NOI_BO', id: 13, orderNumber: 13, isRequireLyDo: false },
];

export class ThaoTacCauHinhBuoc {
  icon: string;
  class: string;
  text: string;
  value: string;
  onClick?: any;
  orderNumber: number;
  kieuCauHinhBuoc: KieuCauHinhBuoc;
  giatri?: any;
}

export const ThaoTacCauHinhBuocControls: Array<ThaoTacCauHinhBuoc> = [
  { icon: 'fa fa-book', class: 'btn-outline-info', text: 'Thông tin đăng ký', value: 'TIM_KIEM_DANG_KY', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Button },
  { icon: 'ft-rotate-ccw', class: 'btn-outline-info', text: 'Chuyển lại', value: 'CHUYEN_LAI', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Button },
  { icon: 'fa fa-info', class: 'btn-outline-info', text: 'Ràng buộc thông tin đăng ký', value: 'RANG_BUOC_DANG_KY', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Validation },
  { icon: 'fa fa-print', class: 'btn-outline-info', text: 'HS quét', value: 'TRA_CUU_HSQ', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Button },
  { icon: 'ft-map', class: 'btn-outline-info', text: 'Bản đồ', value: 'TRA_CUU_BAN_DO', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Button },
  { icon: 'ft-activity', class: 'btn-outline-info', text: 'Thông tin biến động', value: 'TRA_CUU_TT_BIEN_DONG', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Button },
  { icon: 'fa fa-info', class: 'btn-outline-info', text: 'T.Tra TT thực địa', value: 'THAM_TRA_TT_THUC_DIA', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Checkbox },
  { icon: 'fa fa-info', class: 'btn-outline-info', text: 'Ràng buộc Thẩm tra thông tin thực địa', value: 'RANG_BUOC_THAM_TRA_TT_THUC_DIA', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Validation },
  { icon: 'fa fa-inbox', class: 'btn-outline-info', text: 'In GCN', value: 'IN_GIAY_CHUNG_NHAN', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Button },
  { icon: 'fa fa-road', class: 'btn-outline-info', text: 'Xử lý HS Cadas', value: 'XU_LY_HO_SO_CADAS', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Button },
  { icon: 'fa fa-info', class: 'btn-outline-info', text: 'Thông tin GCN', value: 'LAY_TT_GCN_CADAS', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Button },
  { icon: 'fa fa-info', class: 'btn-outline-info', text: 'Ràng buộc thông tin GCN, hồ sơ', value: 'RANG_BUOC_TT_GCN_CADAS', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Validation },
  { icon: 'ft-shopping-bag', class: 'btn-outline-info', text: 'Phiếu chuyển nghĩa vụ', value: 'LAY_PHIEU_CHUYEN_NV', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Button },
  { icon: 'fa fa-info', class: 'btn-outline-info', text: 'Ràng buộc thanh toán', value: 'RANG_BUOC_THANH_TOAN', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Validation },
  { icon: 'fa fa-print', class: 'btn-outline-info', text: 'Cập nhật HS quét', value: 'CAP_NHAT_HSQ', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Button },
  { icon: 'fa fa-road', class: 'btn-outline-danger', text: 'Yêu cầu bổ sung hồ sơ (DVC)', value: 'TRA_LAI_DICH_VU_CONG', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Button },
  { icon: 'fa fa-inbox', class: 'btn-outline-info', text: 'In phiếu tiếp nhận hồ sơ', value: 'IN_PHIEU_TIEP_NHAN_HO_SO', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Button },
  { icon: 'fa fa-info', class: 'btn-outline-info', text: 'Đánh dấu hs đã thầm định', value: 'DANH_DAU_HS_THAM_DINH', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Checkbox },
  { icon: 'fa fa-road', class: 'btn-outline-danger', text: 'Gửi thông báo thuế (DVC)', value: 'GUI_THONG_BAO_THUE_CHO_DVC', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Button },
  { icon: 'fa fa-inbox', class: 'btn-outline-info', text: 'In phiếu kiểm soát', value: 'IN_PHIEU_KIEM_SOAT', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Button },
  { icon: 'fa fa-info', class: 'btn-outline-info', text: 'Đánh dấu hs đã xem', value: 'DANH_DAU_HS_DA_XEM', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Checkbox },
  { icon: 'fa fa-info', class: 'btn-outline-info', text: 'Đánh dấu hs đã thầm tra', value: 'DANH_DAU_HS_THAM_TRA', orderNumber: 1, kieuCauHinhBuoc: KieuCauHinhBuoc.Checkbox },
];

export class LanguageTranslationRoutingPath {
  public static DefaultButtonLable = "COMMON.defaultButtonLabel.";
  public static DefaultGridcolumnTitle = "COMMON.defaultGridcolumnTitle.";
  public static DefaultGridPageTitle = "COMMON.defaultGridPageTitle.";
  public static DefaultTitle = "COMMON.defaultTitle.";
  public static DefaultMessageInformation = "COMMON.defaultMessageInformation.";
  public static DefaultPlaceholder = "COMMON.defaultPlaceholder.";
  public static LinhVuc = "DANH-MUC.linhVuc.";
  public static ThuTuc = "DANH-MUC.thuTuc.";
  public static BuocMau = "DANH-MUC.buocMau.";
  public static BuocQuyTrinh = "DANH-MUC.buocQuyTrinh.";
  public static KetQuaBuoc = "DANH-MUC.ketQuaBuoc.";
  public static ThuTucLoaiGiayTo = "DANH-MUC.thuTucLoaiGiayTo.";
  public static QuyTrinh = "DANH-MUC.quyTrinh.";
  public static CongViecTraCuu = "HO-SO.congViecTraCuu.";
  public static TiepNhanHoSo = "HO-SO.tiepNhanHoSo.";
  public static HoSoDvc = "HO-SO.hoSoDvc.";
  public static TienTrinhXuLy = "HO-SO.tienTrinhXuLy.";
  public static TichHopLienThongThue = "TICH-HOP.lienThongThue.";
  public static Dashboard = "DASHBOARD.dashboard.";
  public static LoaiHoSo = "DANH-MUC.loaihoso.";
  public static DoiTuongKhaiThac = "DANH-MUC.doituongkhaithac.";
}

export const allowed_fileTypes = ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/plain', 'text/csv', 'application/vnd.ms-powerpoint', 'application/vnd.rar', 'application/zip', 'application/x-rar-compressed', 'application/octet-stream',
  'application/x-zip-compressed', 'multipart/x-zip',
  'image/png', 'image/jpeg', 'image/jng', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

export const allowed_fileExtension = "PNG | JPEG | JPG | GIF | PDF | DOC | XLS | DOCX | XLSX | ZIP"

export enum LoaiThongBao {
  LPTB = 'lptb',
  TSDD = 'tsdd',
  TNCN = 'tncn',
  TMD = 'tmd',
  TMN = 'tmn'
}

export enum MaTinh {
  HaNoi = '01',
  TuyenQuang = '08',
  LaiChau = '12',
  QuangNinh = '22',
  ThanhHoa = '38',
  DaNang = '48',
  QuangNam = '49',
  KonTum = '62',
  LamDong = '68',
  TayNinh = '72',
  BinhDuong = '74',
  NinhThuan = '58',
  CaMau = '96',
  BinhDinh = '52',
  PhuTho = '25',
  HauGiang = '93'
}

export enum LoaiCongViec {
  ChuaXuLy = 1,
  DangXuLy = 2,
  SapHetHan = 3,
  QuaHan = 4,
  SapHetHanTraCuu = 13,
  QuaHanTraCuu = 14, // Chỉ tra cứu hồ sơ chưa hoàn thành
  TrongHanTraCuu = 15,
  KetThucTraCuu = 16,
  QuaHanTraCuuAll = 17, // Tra cứu cả những hồ sơ đã hoàn thành
}

export enum IGate {
  V1 = 1,
  V2 = 2
}

export enum TrangThaiXuLyEnum {
  ChuaXuLy = 1,
  DangXuLy = 2,
  DaXuLy = 3,
  TamDung = 5,
  HuyXuLy = 6,
  ChoPhanCongLai = 8,
  DaXuLy_DaChuyenBuoc = 9,
  YeuCauBoSungHoSo = 10,
  ChoThongBaoNVTC = 11,
  ChoHoanThanhNVTC = 12
}

export class ChuyenBuocXulyPopupModel {
  flows: string[];
  dsNguoiXuLyKemTask: ChuyenBuocXuLyNguoiXuLyCommand[];
  dsFiles: FileDinhKem[];
}

export enum XuLyHangLoatActionEnum {
  ChuyenHangLoatNhanh = 1
}

export class XuLyHangLoatAction {
  icon: string;
  class: string;
  text: string;
  value: XuLyHangLoatActionEnum;
  id?: number;
  onClick?: any;
  orderNumber?: number;
}

export interface XuLyHangLoatSelectedModel {
  id: string;
}

export const ChuyenBuocHangLoatNhanhAction: XuLyHangLoatAction = { icon: 'ft-send', class: 'btn-primary', text: 'Chuyển hàng loạt', value: XuLyHangLoatActionEnum.ChuyenHangLoatNhanh, id: 1 };

export interface IXuLyHangLoatConfig {
  isCheckBoxOnGrid: boolean;
  selectionType: SelectionType,
  xuLyHangLoatActions: XuLyHangLoatAction[];
  selected: XuLyHangLoatSelectedModel[];
}


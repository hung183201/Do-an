export interface LoaiBienDongViewModel {
  /**  ID loại biến động */
  id: number;
  /** Tên loại biến động */
  tenLoaiBienDong: string;
  /** Mã loại biến động CN, TC, XC */
  kyHieu: string;
  /** Tên loại biến động được viết tắt để hiện thị lên form */
  vietTat: string;
  /** Mô tả loại biến động */
  moTa: string;
  sinhNoiDungBD_SoDiaChinh: string;
  gach_STT_ThuaDat: boolean;
  gach_STT_ToBanDo: boolean;
  gach_DienTichRieng: boolean;
  gach_DienTichChung: boolean;
  gach_MucDichSD: boolean;
  gach_ThoiHanSD: boolean;
  gach_NguonGocSD: boolean;
  gach_SoPhatHanhGCN: boolean;
  gach_SoVaoSoGCN: boolean;
  gach_TenChu1: boolean | null;
  gach_TenChu2: boolean | null;
  sinhNoiDungBD_SoBienDong: string;
  sinhNoiDungBD_SoMucKe: string;
  sinhNoiDungBD_SoCapGiay: string;
  coThayDoiHinhDangThua: boolean;
  coChuyenLo: boolean | null;
  coThayDoiSoThua: boolean | null;
  coThayDoiChu: boolean | null;
  cauHinhDauRaDauVao: boolean;
  soThuaDauRa: number;
  soThuaDauVao: number;
  /** Mã GUID (thêm mới tự sinh) */
  maGUID: string | null;
}

import * as internal from "assert";
import { TaiLieuKemTheoHoSoDiaChinhViewModel } from "./tai-lieu-kem-theo-viewmodel";


export interface HoSoLuuTruViewModel {
  id: string;
  khoaChaId: string | null;
  khoaCha: HoSoLuuTruViewModel;
  huyenId: string | null;
  xaId: string | null;
  maHoSo: string;
  maHoSoCha: string;
  loaiHoSoLuuTruId: string | null;
  tenLoaiHoSoLuuTru: string | null;
  tenHoSo: string;
  diaChi: string;
  donViHinhThanhPhongId: string | null;
  tenDonViHinhThanhPhong: string | null;
  thoiGianBatDau: Date | null;
  thoiGianKetThuc: Date | null;
  hopHoSoId: string | null;
  tangNganId: string | null;
  giaKeTuId: string | null;
  khoPhongId: string | null;
  thoiHanBaoQuan: string;
  donViBaoQuan: string;
  soLuong: number | null;
  donViTinh: string;
  ngonNguId: string | null;
  /** Chỉ áp dụng đối với những hồ sơ, tài liệu thuộc diện hạn chế sử dụng, tức là thuộc trong các trường hợp sau (A, B, C, D):
   * A: nếu tài liệu chứa đựng những tin thuộc phạm vi bí mật nhà nước
   */
  maCheDoSuDungTaiLieu: string;
  /**  TuyetMat=3, ToiMat=2, Mat=1, Thuong=0 */
  doMat: number | null;
  donViLuuTruId: string | null;
  tenDonViLuuTru: string | null;
  ghiChu: string;
  /** Để đánh dấu tài liệu lịch sử */
  hieuLuc: boolean;
  ngayHieuLuc: string | null;
  ngayHetHieuLuc: string | null;
  laGiayMoiNhat: boolean;
  taiLieuKemTheos: TaiLieuKemTheoHoSoDiaChinhViewModel[];
  hoSoLuuTruCons: HoSoLuuTruViewModel[];
  tenFileGoc: string | null;
  tenKho: string | null;
  TenGia: string | null;
  tenNgan: string | null;
  tenHop: string | null;

  maHoSoSo: string;
  chuSuDung: string | null;
  soTo: string | null;
  soThua: string | null;
  maVachGCN: string | null;
  hasGenerateMaHoSo: boolean;
}

export class InputSearchHoSoLuuTruViewModel {
  xaGuid: string | null;
  xaGuids: string[] | null;
  maHoSo: string | null;
  loaiHoSoLuuTruId: string | null;
  donViLuuTruId: string | null;
  laGiayMoiNhat: string | null;
  soTaiLieu: string | null;
  tenHoSo: string | null;
  soTo: string | null
  soThua: string | null;
  hopHoSoId: string | null;
  tangNganId: string | null;
  giaKeTuId: string | null;
  khoPhongId: string | null;
  pageSize: number;
  pageIndex: number;
}

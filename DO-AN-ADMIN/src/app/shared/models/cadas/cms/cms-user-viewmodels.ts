import { PhongBanViewModel } from "../storage/phong-ban-viewmodel";

export class UserViewModel {
  nguoiDungId: string;
  tenDangNhap: string;
  email: string;
  phoneNumber: string;
  gioiTinh: string;
  hoTenNguoiDung: string;
  diaChi: string;
  chucVu: string;
  anhBieuTuong: string;
  maQuanLyVanBan: string;
  app: string;
  appModule: string;
  thongTinLoaiNguoiDungs: [];
  phongBan: PhongBanViewModel[];
  thongTinPhongBanDonVi: string;
  quyens: [];
  quyenDuLieus_Tinh: number;
  quyenDuLieus: [];
  quyenDuLieuCaNhanToChuc: string;
}

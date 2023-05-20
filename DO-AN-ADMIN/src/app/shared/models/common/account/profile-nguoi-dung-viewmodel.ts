import { DonViHanhChinhViewModel } from "../atom/don-vi-hanh-chinh-viewmodel";

export class ProfileNguoiDungViewModel {
  nguoiDungId: string;
  tenDangNhap: string;
  email: string;
  phoneNumber: string;
  gioiTinh: boolean;
  hoTenNguoiDung: string;
  diaChi: string;
  chucVu: string;
  quyenDuLieus_Tinh: string;
  anhBieuTuong: string;
  thongTinLoaiNguoiDungs: string[];
  quyens : string[];
  quyenDuLieus : Array<DonViHanhChinhViewModel>;


}


export class TenNguoiDungViewModel {
  nguoiDungId: string;
  gioiTinh: boolean;
  hoTenNguoiDung: string;
  chucVu: string;
  email: string;
  phoneNumber: string;
}

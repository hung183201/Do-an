export class Profile {
  NguoiDungId: string;
  TenDangNhap: string;
  Email: string;
  PhoneNumber: string;
  GioiTinh: boolean;
  HoTenNguoiDung: string;
  DiaChi: string;
  ChucVu: string;
  AnhBieuTuong: string;
  ThongTinLoaiNguoiDungs: string[];
}


export class TenNguoiDung {
  NguoiDungId: string;
  GioiTinh: boolean;
  HoTenNguoiDung: string;
  ChucVu: string;
  Email: string;
  PhoneNumber: string;
}

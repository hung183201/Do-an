import { TinhTrangPhieuChuyen } from "@app/api-lpm-client";

export class UpdateTrangThaiKySoDto {
  hoSoDangKyId: string;
  phieuChuyenThueId: string;
  nguoiKy: string;
  ngayKy: Date;
  tinhTrangPhieuChuyen: TinhTrangPhieuChuyen;
  tinhTrangPhieuChuyenText: string;
  dsFileHoSoDaKy?: FileDinhKemDto[] | undefined;

}

export class FileDinhKemDto {
  id?: string | undefined;
  tenFile?: string | undefined;
  link?: string | undefined;
}
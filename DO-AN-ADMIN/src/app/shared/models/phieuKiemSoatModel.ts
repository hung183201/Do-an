import { Buoc, QTHTPhongBanViewModel } from "app/api-lpm-client";
import { IOption } from "./commonModels";

export class PhieuKiemSoat {
  idHoSo: string;
  maHoSo: string;
  tenHuyen: string;
  tenTinh: string;
  ngayNhan: Date;
  nguoiNop: string;
  diaChi: string;
  dienThoai: string;
  email: string;
  tenThuTuc: string;
  nguoiTiepNhan: string;
  ngayHenTra: Date;
  thoiGianThucHien: string;
  dsBuocXuly?: Buoc[] | undefined
  maTinh: string;
  nguoiXuLy : IOption[] = [];
  qthtPhongBan?: QTHTPhongBanViewModel[] | undefined;
}

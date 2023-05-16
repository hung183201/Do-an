import { IHoSoLoaiGiayToViewModel } from "./commonModels";

export class PhieuTiepNhanHoSoModel {
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
  hoSoLoaiGiayTos?: IHoSoLoaiGiayToViewModel[] | undefined;
  maTinh: string;
}

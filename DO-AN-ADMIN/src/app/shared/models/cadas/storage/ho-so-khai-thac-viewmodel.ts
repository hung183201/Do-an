import { NullTemplateVisitor } from "@angular/compiler";
import * as internal from "assert";
import { HoSoKhaiThacThanhPhanHoSoViewModel } from "./ho-so-khai-thac-thanh-phan-ho-so-viewmodel";

export class HoSoKhaiThacViewModel {
    id: string;
    phieuYeuCauKhaiThacId: string | null;
    maHoSoKhaiThac: string|null;
    tenDangNhapNguoiLapHoSo: string | null;
    hoTenNguoiLapHoSo: string | null;
    donViNguoiLapHoSo: string | null;
    hoTenNguoiMuon : string | null;
    diaChi: string | null;
    email: string | null;
    sdt: string | null;
    cccd: string;
    noiDung: string;
    mucDich: string | null;
    ghiChu: string| null;
    ngayMuon: Date | null;
    ngayMuonUnixTimestamp :number|null;
    ngayHenTra: Date | null;
    ngayHenTraUnixTimestamp : number |null;
    hinhThucHoSo: number ;
    trangThaiHoSo: number ;
    tenDangNhapNguoiDuyet: string | null;
    hoTenNguoiDuyet: string | null;
    donViNguoiDuyet: string;
    yKienDuyet: string;
    hoSoKhaiThac_ThanhPhanHoSos : HoSoKhaiThacThanhPhanHoSoViewModel[];

    ngayTaoHoSo : Date;
    ngayTraHoSo : Date;

    maHuyen : number | null;
    maXa : number | null;
  }

  export class InputSearchHoSoKhaiThacViewModel {
    maHoSo : string | null;
    tenDangNhapNguoiLapHoSo : string | null;
    tenDangNhapNguoiDuyet : string | null;
    hinhThucHoSo : number | null
    trangThaiHoSo : number | null;
    pageSize : number;
    pageIndex: number;
    lstTrangThaiHoSo : number[];
  }

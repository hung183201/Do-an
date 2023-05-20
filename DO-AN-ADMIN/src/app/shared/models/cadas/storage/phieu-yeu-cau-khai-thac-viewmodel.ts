import { HoSoLuuTruViewModel } from "./ho-so-luu-tru-viewmodel";

export class PhieuYeuCauKhaiThacViewmodel {
    id: string;
    maPhieuYeuCau: string|null;
    tenDangNhapNguoiYeuCau: string | null;
    hoTenNguoiYeuCau: string | null;
    donVi: string | null;
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
    hinhThucPhieu: number ;
    trangThaiPhieu: number ;
    hoSoLuuTrus : HoSoLuuTruViewModel[];
    
    ngayTaoPhieu : Date;
    ngayTraKetQua : Date;

    maHuyen : number | null;
    maXa : number | null;
}
export class PhieuYeuCauKhaiThacHoSoLuuTruViewmodel {
    phieuYeuCauKhaiThacId: string;
    hoSoLuuTruId: string;
   
}
export class InputSearchPhieuYeuCauKhaiThacViewModel {
    maPhieu : string | null;
    fullTextSearch : string | null;
    tenDangNhapNguoiYeuCau : string | null;
    hoTenNguoiYeuCau : string | null;
    hinhThucPhieu : number | null
    trangThaiPhieu : number | null;
    pageSize : number;
    pageIndex: number;
  }

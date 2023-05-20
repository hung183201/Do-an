export interface HoSoKhaiThacThanhPhanHoSoViewModel {
    id: string;
    hoSoKhaiThacId: string | null;
    hoSoLuuTruId: string|null;
    tenHuyen: string | null;
    tenXa: string | null;
    maHoSo: string;
    tenLoaiHoSoLuuTru: string;
    tenHoSo: string | null;
    diaChi: string | null;
    tenDonViHinhThanhPhong: string;
    tenKho: string;
    tenGia: string | null;
    tenNgan: string| null;
    tenHop: string| null;
    thoiGianBatDau: Date | null;
    
    thoiGianKetThuc: Date | null;
    soLuong: number ;
    thoiHanBaoQuan: string | null;
    donViBaoQuan: string | null;
    donViTinh: string;
    tenNgonNgu: string;
    maCheDoSuDungTaiLieu: string | null;
    doMat: string | null;
    tenDonViLuuTru: string;
    ghiChu: string;
    tenFileGoc: string | null;
    danhSachTaiLieuKemTheo: string | null;
  }
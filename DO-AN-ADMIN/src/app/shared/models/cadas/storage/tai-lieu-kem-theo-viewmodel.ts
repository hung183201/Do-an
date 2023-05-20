import { CustomValViewModel } from "../../common/atom/custom-val-viewmodel";

export interface TaiLieuDinhKemViewModel {
  id: string | null;
  hoSoLuuTruId: string;
  tenLoaiTaiLieu: string;
  soTaiLieu: string;
  soVaoSo: string;
  thoiGian: string | null;
  tacGia: string;
  trichYeu: string;
  toSo: string;
  ghiChu: string;
  mineType: string;
  fileName: string;
  fileSize: number | null;
  filePath: string;
  //link file nháp
  filePathTemp: string;
  thuTuSapXep: number | null;
}



export interface TaiLieuKemTheoCustomValViewModel extends CustomValViewModel {
  taiLieuKemTheoId: string;
}



export interface TaiLieuKemTheoHoSoDiaChinhViewModel extends TaiLieuDinhKemViewModel {
  soThuTuThua: string;
  soHieuToBanDo: string;
  dienTich: string;
  loaiDat: string;
  maVach: string;
}

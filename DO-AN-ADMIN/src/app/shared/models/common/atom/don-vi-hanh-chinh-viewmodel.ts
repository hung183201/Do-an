/** Thông tin tỉnh, thành phố ở Việt Nam */
export interface TinhViewModel {
  /** Tỉnh Id */
  id: string;
  /** Mã tỉnh ở VN gồm 2 số */
  maTinh: number;
  /** Tên tỉnh */
  tenTinh: string;
}

/** Thông tin quận/huyện/thị xã ở việt nam */
export interface HuyenViewModel {
  /** Huyện Id */
  id: string;
  /** Mã huyện ở VN gồm 3 số */
  maHuyen: number;
  /** Mã tỉnh ở VN gồm 2 số */
  maTinh: number;
  /** Tên huyện */
  tenHuyen: string;
}

/** Thông tin xã ở Việt Nam*/
export interface XaViewModel {
  /** Xã Id */
  id: string;
  /** Mã xã/Phường, thị trấn gồm 5 số, ở việt nam */
  maXa: number;
  /** Tên Xã/phường/thị trân */
  tenXa: string;
  /** Mã huyện ở VN gồm 3 số */
  maHuyen: number;

}




export interface DonViHanhChinhViewModel {
  /** Mã xã/Phường, thị trấn gồm 5 số, ở việt nam */
  maXa: number;
  /** Tên Xã/phường/thị trân */
  tenXa: string;
  /** Mã huyện ở VN gồm 3 số */
  maHuyen: number;
  /** Tên huyện */
  tenHuyen: string;
  /** Mã tỉnh ở VN gồm 2 số */
  maTinh: number;
  /** Tên tỉnh */
  tenTinh: string;
  /** Tên đơn vị hành chính */
  tenDonViHanhChinh: string;
}


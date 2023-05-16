export const DANH_MUC_LINH_VUC = "LPM_DANH_MUC_LINH_VUC";
export const DANH_MUC_THU_TUC = "LPM_DANH_MUC_THU_TUC";
export const DANH_MUC_QUY_TRINH = "LPM_DANH_MUC_QUY_TRINH";
export const DANH_MUC_CHUYEN_LAI_BUOC_HO_SO = "LPM_DANH_MUC_CHUYEN_LAI_BUOC_HO_SO";
export const LPM_DANH_MUC_ANH_XA_DU_LIEU = "LPM_DANH_MUC_ANH_XA_DU_LIEU";
export const PHAN_CONG_CAU_HINH = "LPM_PHAN_CONG_CAU_HINH";
export const HO_SO_DANH_SACH_HO_SO = "LPM_HO_SO_DANH_SACH_HO_SO";
export const LPM_HO_SO_LE_PHI_TTHC = "LPM_HO_SO_LE_PHI_TTHC";
export const HO_SO_TRA_CUU = "LPM_HO_SO_TRA_CUU";
export const LPM_BAO_CAO = "LPM_BAO_CAO";
export const HO_SO_TIEP_NHAN_TRUC_TIEP = "LPM_HO_SO_TIEP_NHAN_TRUC_TIEP";
export const HO_SO_TIEP_NHAN_TU_DVC = "LPM_HO_SO_TIEP_NHAN_TU_DVC";
export const PHAN_CONG_LAI_NGUOI_DANG_XU_LY = "LPM_PHAN_CONG_LAI_NGUOI_DANG_XU_LY";
export const HO_SO_XU_LY_BUOC = "LPM_HO_SO_XU_LY_BUOC";
export const LPM_CAU_HINH_LICH_LAM_VIEC = "LPM_CAU_HINH_LICH_LAM_VIEC";
export const TICH_HOP_DANH_SACH_LIEN_THONG_THUE = "LPM_TICH_HOP_DANH_SACH_LIEN_THONG_THUE";
export const DANH_MUC_TRANGTHAI_THUCHIEN = "LPM_DANH_MUC_TRANGTHAI_THUCHIEN";
export const DANH_MUC_MAIL = "LPM_DANH_MUC_MAIL";
export const LPM_XOA_TAI_LIEU_HO_SO = "LPM_XOA_TAI_LIEU_HO_SO";
export const RoutePermissionConfig = [
  // Danh mục
  {
    path: '/danh-muc/linh-vuc',
    actionGroupsCode: [
      DANH_MUC_LINH_VUC
    ]
  },
  {
    path: '/danh-muc/thu-tuc',
    actionGroupsCode: [
      DANH_MUC_THU_TUC
    ]
  },
  {
    path: '/danh-muc/quy-trinh',
    actionGroupsCode: [
      DANH_MUC_QUY_TRINH
    ]
  },
  {
    path: '/danh-muc/quy-trinh-dong',
    actionGroupsCode: [
      DANH_MUC_QUY_TRINH
    ]
  },
  {
    path: '/danh-muc/cau-hinh-quy-trinh',
    actionGroupsCode: [
      DANH_MUC_QUY_TRINH
    ]
  },
  {
    path: '/danh-muc/modeler',
    actionGroupsCode: [
      DANH_MUC_QUY_TRINH
    ]
  },
  {
    path: '/danh-muc/loai-ho-so',
    actionGroupsCode: [
      DANH_MUC_QUY_TRINH
    ]
  },
  {
    path: '/danh-muc/loai-giay-to',
    actionGroupsCode: [
      DANH_MUC_QUY_TRINH
    ]
  },
  {
    path: '/danh-muc/doi-tuong-khai-thac',
    actionGroupsCode: [
      HO_SO_TIEP_NHAN_TRUC_TIEP
    ]
  },
  {
    path: '/danh-muc/anh-xa-du-lieu',
    actionGroupsCode: [
      LPM_DANH_MUC_ANH_XA_DU_LIEU
    ]
  },
  {
    path: '/danh-muc/anh-xa-du-lieu-tinh',
    actionGroupsCode: [
      LPM_DANH_MUC_ANH_XA_DU_LIEU
    ]
  },
  // Phân công
  {
    path: '/phan-cong',
    actionGroupsCode: [
      PHAN_CONG_CAU_HINH
    ]
  },
  // Quản lý hồ sơ
  {
    path: '/ho-so/ds-tiep-nhan-ho-so',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/ho-so/ds-tiep-nhan-ho-so-chua-xu-ly',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/ho-so/ds-tiep-nhan-ho-so-dang-xu-ly',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/ho-so/ds-ho-so-gdbd',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/ho-so/ds-tiep-nhan-ho-so-sap-het-han',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/ho-so/ds-tiep-nhan-ho-so-qua-han',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/ho-so/ds-tiep-nhan-ho-so-tam-dung',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/ho-so/ds-tiep-nhan-ho-so-tra-lai',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/ho-so/ds-ho-so-hoan-thanh',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/ho-so/ds-ho-so-tra-cuu',
    actionGroupsCode: [
      HO_SO_TRA_CUU
    ]
  },
  {
    path: '/ho-so/ds-cong-viec-tra-cuu',
    actionGroupsCode: [
      HO_SO_TRA_CUU
    ]
  },
  {
    path: '/ho-so/ds-ho-so-standard',
    actionGroupsCode: [
      HO_SO_TRA_CUU
    ]
  },
  {
    path: '/ho-so/ds-phieu-chuyen-thue-standard',
    actionGroupsCode: [
      HO_SO_TRA_CUU
    ]
  },
  {
    path: '/ho-so/tra-cuu-ho-so',
    actionGroupsCode: [
      HO_SO_TRA_CUU
    ]
  },
  {
    path: '/bao-cao/thong-ke-theo-can-bo',
    actionGroupsCode: [
      LPM_BAO_CAO
    ]
  },
  {
    path: '/bao-cao/tong-hop-ho-so-can-xu-ly',
    actionGroupsCode: [
      LPM_BAO_CAO
    ]
  },
  {
    path: '/bao-cao/thong-ke-theo-tuan-thang-quy',
    actionGroupsCode: [
      LPM_BAO_CAO
    ]
  },
  {
    path: '/bao-cao/thong-ke-theo-quy-trinh',
    actionGroupsCode: [
      LPM_BAO_CAO
    ]
  },
  {
    path: '/bao-cao/bao-cao-theo-don-vi',
    actionGroupsCode: [
      LPM_BAO_CAO
    ]
  },
  {
    path: '/bao-cao/bao-cao-theo-thu-tuc',
    actionGroupsCode: [
      LPM_BAO_CAO
    ]
  },
  {
    path: '/bao-cao/bao-cao-theo-chuyen-vien',
    actionGroupsCode: [
      LPM_BAO_CAO
    ]
  },
  {
    path: '/bao-cao/bao-cao-theo-to-chuc',
    actionGroupsCode: [
      LPM_BAO_CAO
    ]
  },
  {
    path: '/bao-cao/bao-cao-ho-so-lien-thong',
    actionGroupsCode: [
      LPM_BAO_CAO
    ]
  },
  {
    path: '/bao-cao/giao-dich-ho-so-dat-dai',
    actionGroupsCode: [
      LPM_BAO_CAO
    ]
  },
  {
    path: '/bao-cao/giao-dich-ho-so-dat-dai-vpdk',
    actionGroupsCode: [
      LPM_BAO_CAO
    ]
  },
  {
    path: '/ho-so/ds-ho-so-da-chuyen',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/ho-so/tiep-nhan-ho-so-truc-tiep',
    actionGroupsCode: [
      HO_SO_TIEP_NHAN_TRUC_TIEP
    ]
  },
  {
    path: '/ho-so/tiep-nhan-ho-so-dvc',
    actionGroupsCode: [
      HO_SO_TIEP_NHAN_TU_DVC
    ]
  },
  {
    path: '/ho-so/phan-cong-lai',
    actionGroupsCode: [
      PHAN_CONG_LAI_NGUOI_DANG_XU_LY
    ]
  },
  {
    path: '/ho-so/xu-ly-buoc',
    actionGroupsCode: [
      HO_SO_XU_LY_BUOC
    ]
  },
  {
    path: '/ho-so/phi-le-phi-tthc',
    actionGroupsCode: [
      LPM_HO_SO_LE_PHI_TTHC
    ]
  },
  {
    path: '/ho-so/ds-ho-so-cho-ket-qua-thue',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/ho-so/ds-ho-so-hoan-thanh-nvtc',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/ho-so/ds-ho-so-du-dk-in-gcn',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/ho-so/ds-ho-so-chua-du-dk-in-gcn',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  // Tích hợp
  {
    path: '/tich-hop/ds-lien-thong-thue',
    actionGroupsCode: [
      TICH_HOP_DANH_SACH_LIEN_THONG_THUE
    ]
  },
  {
    path: '/tich-hop/ds-phieu-chuyen-loi',
    actionGroupsCode: [
      TICH_HOP_DANH_SACH_LIEN_THONG_THUE
    ]
  },

  // Danh mục iFrame
  {
    path: '/content/danh-muc/linh-vuc',
    actionGroupsCode: [
      DANH_MUC_LINH_VUC
    ]
  },
  {
    path: '/content/danh-muc/thu-tuc',
    actionGroupsCode: [
      DANH_MUC_THU_TUC
    ]
  },
  {
    path: '/content/danh-muc/quy-trinh',
    actionGroupsCode: [
      DANH_MUC_QUY_TRINH
    ]
  },
  {
    path: '/content/danh-muc/quy-trinh-dong',
    actionGroupsCode: [
      DANH_MUC_QUY_TRINH
    ]
  },
  {
    path: '/content/danh-muc/cau-hinh-quy-trinh',
    actionGroupsCode: [
      DANH_MUC_QUY_TRINH
    ]
  },
  {
    path: '/content/danh-muc/modeler',
    actionGroupsCode: [
      DANH_MUC_QUY_TRINH
    ]
  },
  {
    path: '/content/danh-muc/anh-xa-du-lieu',
    actionGroupsCode: [
      LPM_DANH_MUC_ANH_XA_DU_LIEU
    ]
  },
  {
    path: '/content/danh-muc/anh-xa-du-lieu-tinh',
    actionGroupsCode: [
      LPM_DANH_MUC_ANH_XA_DU_LIEU
    ]
  },
  {
    path: '/content/danh-muc/loai-ho-so',
    actionGroupsCode: [
      LPM_DANH_MUC_ANH_XA_DU_LIEU
    ]
  },
  {
    path: '/content/danh-muc/loai-giay-to',
    actionGroupsCode: [
      LPM_DANH_MUC_ANH_XA_DU_LIEU
    ]
  },
  // Phân công
  {
    path: '/content/phan-cong',
    actionGroupsCode: [
      PHAN_CONG_CAU_HINH
    ]
  },
  // Quản lý hồ sơ
  {
    path: '/content/ho-so/ds-tiep-nhan-ho-so',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/content/ho-so/ds-tiep-nhan-ho-so-chua-xu-ly',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/content/ho-so/ds-tiep-nhan-ho-so-dang-xu-ly',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/content/ho-so/ds-ho-so-gdbd',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/content/ho-so/ds-tiep-nhan-ho-so-sap-het-han',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/content/ho-so/ds-tiep-nhan-ho-so-qua-han',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/content/ho-so/ds-tiep-nhan-ho-so-tam-dung',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/content/ho-so/ds-tiep-nhan-ho-so-tra-lai',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/content/ho-so/ds-ho-so-hoan-thanh',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/content/ho-so/phi-le-phi-tthc',
    actionGroupsCode: [
      LPM_HO_SO_LE_PHI_TTHC
    ]
  },
  {
    path: '/content/ho-so/ds-ho-so-cho-ket-qua-thue',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/content/ho-so/ds-ho-so-hoan-thanh-nvtc',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/content/ho-so/ds-ho-so-du-dk-in-gcn',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/content/ho-so/ds-ho-so-chua-du-dk-in-gcn',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/content/ho-so/ds-ho-so-tra-cuu',
    actionGroupsCode: [
      HO_SO_TRA_CUU
    ]
  },
  {
    path: '/content/ho-so/ds-cong-viec-tra-cuu',
    actionGroupsCode: [
      HO_SO_TRA_CUU
    ]
  },
  {
    path: '/content/ho-so/ds-ho-so-da-chuyen',
    actionGroupsCode: [
      HO_SO_DANH_SACH_HO_SO
    ]
  },
  {
    path: '/content/ho-so/tiep-nhan-ho-so-truc-tiep',
    actionGroupsCode: [
      HO_SO_TIEP_NHAN_TRUC_TIEP
    ]
  },
  {
    path: '/content/ho-so/tiep-nhan-ho-so-dvc',
    actionGroupsCode: [
      HO_SO_TIEP_NHAN_TU_DVC
    ]
  },
  {
    path: '/content/ho-so/phan-cong-lai',
    actionGroupsCode: [
      PHAN_CONG_LAI_NGUOI_DANG_XU_LY
    ]
  },
  {
    path: '/content/ho-so/xu-ly-buoc',
    actionGroupsCode: [
      HO_SO_XU_LY_BUOC
    ]

  },
  {
    path: '/content/ho-so/tra-cuu-ho-so',
    actionGroupsCode: [
      HO_SO_TRA_CUU
    ]

  },
  {
    path: '/danh-muc/quan-ly-ngay-nghi',
    actionGroupsCode: [
      LPM_CAU_HINH_LICH_LAM_VIEC
    ]
  },
  {
    path: 'content/danh-muc/quan-ly-ngay-nghi',
    actionGroupsCode: [
      LPM_CAU_HINH_LICH_LAM_VIEC
    ]
  },
  //Tích hợp
  {
    path: '/content/tich-hop/ds-lien-thong-thue',
    actionGroupsCode: [
      TICH_HOP_DANH_SACH_LIEN_THONG_THUE
    ]
  },
  {
    path: '/content/tich-hop/ds-phieu-chuyen-loi',
    actionGroupsCode: [
      TICH_HOP_DANH_SACH_LIEN_THONG_THUE
    ]
  },
  {
    path: '/danh-muc/trang-thai-thuc-hien',
    actionGroupsCode: [
      DANH_MUC_TRANGTHAI_THUCHIEN
    ]
  },
  {
    path: 'content/danh-muc/trang-thai-thuc-hien',
    actionGroupsCode: [
      DANH_MUC_TRANGTHAI_THUCHIEN
    ]
  },
  {
    path: '/danh-muc/mail-setting',
    actionGroupsCode: [
      DANH_MUC_MAIL
    ]
  },
  {
    path: 'content/danh-muc/mail-setting',
    actionGroupsCode: [
      DANH_MUC_MAIL
    ]
  },
  {
    path: '/danh-muc/mail-mau',
    actionGroupsCode: [
      DANH_MUC_MAIL
    ]
  },
  {
    path: 'content/danh-muc/mail-mau',
    actionGroupsCode: [
      DANH_MUC_MAIL
    ]
  },
  {
    path: '/danh-muc/chuyen-lai-buoc-ho-so',
    actionGroupsCode: [
      DANH_MUC_CHUYEN_LAI_BUOC_HO_SO
    ]
  },
]


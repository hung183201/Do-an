
using Common.Attributes;

namespace Application.Enums
{
    public enum Gender
    {
        None,
        Female,
        Male
    }

    public enum ActionMode
    {
        Add,
        Edit
    }

    public enum SearchOperator
    {
        Equal,
        NotEqual
    }

    public enum ApiCode
    {
        Success = 0,
        GeneralError = 100,
        ExistingData = 102,
        InvalidArgument = 105,
        UnAuthorizedAccess = 401,
        BusinessError = 400,
        NotFoundError = 404,
        InternalError = 500,
        ValidationError = 600,
        BuocXuLyNotExistOrProcessed = 801

    }

    public enum StorageMinioConnectionType
    {
        NoSSL = 1,
        SSL = 2,
        Proxy = 3
    }

    public enum LoaiYeuCauPhieuChuyen
    {
        GuiMoi = 10,
        CapNhat = 11,
    }

    public enum UserLevelQtht
    {
        Normal = 0,
        SubAdmin = 100,
        Admin = 200,
        SubSystem = 800,
        System = 900,
    }

    public enum UserTitleQtht
    {
        [Text("Chuyên viên", "ChuyenVien")]
        ChuyenVien = 0,
        [Text("Lãnh đạo Chi nhánh", "LanhDaoChiNhanh")]
        LanhDaoChiNhanh = 1,
        [Text("Chuyên viên VPĐK tỉnh", "ChuyenVienVpdkTinh")]
        ChuyenVienVpdkTinh = 2,
        [Text("Lãnh đạo phòng Đăng ký cấp GCN", "LanhDaoPhongDangKyCapGcn")]
        LanhDaoPhongDangKyCapGcn = 3,
        [Text("Lãnh đạo VPĐK", "LanhDaoVpdk")]
        LanhDaoVpdk = 4,
        [Text("Lãnh đạo Sở", "LanhDaoSo")]
        LanhDaoSo = 5,
        [Text("Lãnh đạo UBND", "LanhDaoUBND")]
        LanhDaoUBND = 6,
        [Text("Lãnh đạo phòng TNMT", "LanhDaoTNMT")]
        LanhDaoTNMT = 7,
        [Text("Khác", "Khac")]
        Khac = 20,
    }


    public enum StatusQtht
    {
        Active,
        Deactive,
        Deleted
    }


    public enum Tinh
    {
        [Text("Hà Nội", "01")]
        HaNoi = 01,
        [Text("Tuyên Quang", "08")]
        TuyenQuang = 08,
        [Text("Quảng Ninh", "22")]
        QuangNinh = 22,
        [Text("Lai Châu", "12")]
        LaiChau = 12,
        [Text("Thanh Hóa", "38")]
        ThanhHoa = 38,
        [Text("Quảng Nam", "49")]
        QuangNam = 49,
        [Text("Đà Nẵng", "48")]
        DaNang = 48,
        [Text("Lâm Đồng", "68")]
        LamDong = 68,
        [Text("Tây Ninh", "72")]
        TayNinh = 72,
        [Text("Kon Tum", "62")]
        KonTum = 62,
        [Text("Bình Dương", "74")]
        BinhDuong = 74,
        [Text("Ninh Thuận", "58")]
        NinhThuan = 58,
        [Text("Phú Thọ", "25")]
        PhuTho = 25,
        [Text("Cà Mau", "96")]
        CaMau = 96,
        [Text("Hậu Giang", "93")]
        HauGiang = 93,
        [Text("Bình Định", "52")]
        BinhDinh = 52,
    }
    public enum DatabaseType
    {
        Oracle,
        SqlServer,
        Postgre
    }

}
using System;

namespace Common
{
    public class Constants
    {
        public static string DefaultCorsPolicy = nameof(DefaultCorsPolicy);
        public const string FormatKeyChuoiGiaTriSoBienNhan = "QT_SoBienNhan_@MaXa_@MaNam4";
        public static readonly string MaXaFormat = "0".PadLeft(5, '0');
        public static readonly string MaHuyenFormat = "0".PadLeft(3, '0');
        public static readonly int LiveTimeToken = 1800;
        public static readonly int LongLiveTimeMinIoToken = Int32.MaxValue;
        public const string ShareFileSignInXmlGuiThue = "*ShareFile*";
        public const int MaxItemsPerSet = 1000;
        public const string HttpProtocol = "http";

        public static class UserActionGroupCode
        {
            public static string LPM_XOA_TAI_LIEU_HO_SO = "LPM_XOA_TAI_LIEU_HO_SO";
        }

        public static class Separator
        {
            public static string VerticalSlash = "|";
            public static string ForwardSlash = "/";
            public static string Dash = "-";
            public static string Underscore = "_";
            public static string Comma = ",";
            public static string SemiColon = ";";
            public static string Colon = ":";
        }

        public static class DateTimeFormat
        {
            public static string DateTimeForThue = "dd-MMM-yyyy HH:mm:ss";
            public static string Date = "dd/MM/yyyy";
            public static string DateTime = "dd/MM/yyyy HH:mm:ss";
        }

        public static class PagingDefault
        {
            public static int PageIndex = 1;
            public static int PageSize = 20;
            public static int PageSize10 = 10;
        }

        public const string ActivitiApiClientName = "activitiClient";
        public const string CadasApiClientName = "cadasClient";
        public const string DvcBinhPhuocApiClientName = "dvcBinhPhuocClient";
        public const string DvcTayNinhApiClientName = "dvcTayNinhClient";
        public const string DvcQuangNamApiClientName = "dvcQuangNamClient";
        public const string QthtAuthorizeApiClientName = "qthtAuthorizeClient";
        public const string CadasStandardApiClientName = "cadasStandardClient";
        public const string DvcQuangNinhApiClientName = "dvcQuangNinhClient";
        public const string DvcKonTumApiClientName = "dvcKonTumClient";
        public const string DvcKonTumSSOClientName = "dvcKonTumSSOClient";
        public const string DvcTuyenQuangApiClientName = "dvcTuyenQuangClient";
        public const string DvcLamDongApiClientName = "dvcLamDongClient";
        public const string DvcCaMauApiClientName = "dvcCaMauClient";
        public const string DvcHauGiangApiClientName = "dvcHauGiangClient";
        public const string GiaDatApiClientName = "giaDatClient";
        public const string LpmApiClientName = "LpmClient";
        
        public const string RedisRootName = "ILIS-LPM-API";
        public const string DvcBinhDinhApiClientName = "dvcBinhDinhClient";
        public const string DvcPhuThoApiClientName = "dvcPhuThoClient";
        public const string DvcHaNoiApiClientName = "dvcHaNoiClient";
        public const string StsAuthorityApiClientName = "stsAuthority";
    }
}

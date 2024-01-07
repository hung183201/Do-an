using System;

namespace Domain.Entities
{
    public class AuditableEntity
    {
        public DateTime? NgayTao { get; set; }
        public string NguoiTao { get; set; }
        public string IdNguoiTao { get; set; }
        public DateTime? NgayCapNhat { get; set; }
        public string NguoiCapNhat { get; set; }
        public string IdNguoiCapNhat { get; set; }
    }
}

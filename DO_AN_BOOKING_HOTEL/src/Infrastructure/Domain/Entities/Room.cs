using System;
using System.Collections.Generic;

#nullable disable

namespace Domain.Entities
{
    public partial class Room : BaseEntity<int>, IHasTrangThai
    {
        public string Image { get; set; }
        public int? IdRoomType { get; set; }
        public TrangThai Status { get; set; }
        public string TenTrangThai => Common.ConvertTrangThai(Status);

        public virtual RoomType IdRoomTypeNavigation { get; set; }
    }
}

using System;
using System.Collections.Generic;

#nullable disable

namespace Domain.Entities
{
    public partial class Utility : BaseEntity<int>, IHasTrangThai
    {
        public Utility()
        {
            RoomUtilities = new HashSet<RoomUtility>();
            HotelUtilities = new HashSet<HotelUtility>();
        }

        public string? NameUtilities { get; set; }
        public string Icon { get; set; }
        public int? UtilitiesType { get; set; }
        public TrangThai Status { get; set; }
        public string StatusName => Common.ConvertTrangThai(Status);

        public virtual ICollection<RoomUtility> RoomUtilities { get; set; }
        public virtual ICollection<HotelUtility> HotelUtilities { get; set; }
    }
}

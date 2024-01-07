using System;
using System.Collections.Generic;

#nullable disable

namespace Domain.Entities
{
    public partial class RoomUtility : BaseEntity<int>
    {
        public int? IdUtilities { get; set; }
        public int? IdRoomTypes { get; set; }

        public virtual RoomType IdRoomTypesNavigation { get; set; }
        public virtual Utility IdUtilitiesNavigation { get; set; }
    }
}

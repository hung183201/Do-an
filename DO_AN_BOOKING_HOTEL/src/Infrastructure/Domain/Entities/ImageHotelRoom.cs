using System;
using System.Collections.Generic;

#nullable disable

namespace Domain.Entities
{
    public partial class ImageHotelRoom : BaseEntity<int>
    {
        public int? IdHotelOrRoom { get; set; }
        public int? IdImage { get; set; }

        public virtual Hotel IdHotelOrRoomNavigation { get; set; }
        public virtual Image IdImageNavigation { get; set; }
        public virtual RoomType RoomType { get; set; }
    }
}

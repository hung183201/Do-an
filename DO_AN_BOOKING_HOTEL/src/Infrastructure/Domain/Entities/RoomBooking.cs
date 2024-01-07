using System;
using System.Collections.Generic;

#nullable disable

namespace Domain.Entities
{
    public partial class RoomBooking : BaseEntity<int>
    {

        public int? IdRoomType { get; set; }
        public int? IdBooking { get; set; }

        public decimal? Price { get; set; }
        public virtual Booking IdBookingNavigation { get; set; }
        public virtual RoomType IdRoomTypeNavigation { get; set; }
    }
}

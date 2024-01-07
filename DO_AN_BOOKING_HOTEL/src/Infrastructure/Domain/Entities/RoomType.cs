using System;
using System.Collections.Generic;

#nullable disable

namespace Domain.Entities
{
    public partial class RoomType : BaseEntity<int>, IHasTrangThai
    {
        public RoomType()
        {
            RoomBookings = new HashSet<RoomBooking>();
            RoomUtilities = new HashSet<RoomUtility>();
            Rooms = new HashSet<Room>();
        }

        public string NameRoomType { get; set; }
        public decimal? Price { get; set; }
        public int? TotalRoom { get; set; }
        public string Size { get; set; }
        public int? MaxPeople { get; set; }
        public int? TotalBed { get; set; }
        public string ExtraBed { get; set; }
        public int? IdHotel { get; set; }
        public TrangThai Status { get; set; }
        public string StatusName => Common.ConvertTrangThai(Status);

        public virtual Hotel IdHotelNavigation { get; set; }
        public virtual ImageHotelRoom IdRoomTypeNavigation { get; set; }
        public virtual ICollection<RoomBooking> RoomBookings { get; set; }
        public virtual ICollection<RoomUtility> RoomUtilities { get; set; }
        public virtual ICollection<Room> Rooms { get; set; }
    }
}

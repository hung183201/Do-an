using System;
using System.Collections.Generic;

#nullable disable

namespace Domain.Entities
{
    public partial class Booking : BaseEntity<int>, IHasTrangThai
    {

        public Booking()
        {
            RoomBookings = new HashSet<RoomBooking>();
            BooKingServices = new HashSet<BooKingServices>();
        }

        public int? IdUser { get; set; }
        public Guid UserId { get; set; }
        public DateTime? CheckIn { get; set; }
        public string CheckOut { get; set; }
        public decimal? TotalPrice { get; set; }
        public string Note { get; set; }
        public TrangThai Status { get; set; }
        public string StatusName => Common.ConvertTrangThai(Status);

        public  AppUser AppUser { get; set; }

        public virtual UserClient IdUserNavigation { get; set; }
        public virtual ICollection<RoomBooking> RoomBookings { get; set; }
        public virtual ICollection<BooKingServices> BooKingServices { get; set; }

    }
}

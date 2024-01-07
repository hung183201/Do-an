using System;
using System.Collections.Generic;

#nullable disable

namespace Domain.Entities
{
    public partial class UserClient :BaseEntity<int>, IHasTrangThai
    {
        public UserClient()
        {
            Bookings = new HashSet<Booking>();
        }

        public string NameClient { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public TrangThai Status { get; set; }
        public string StatusName => Common.ConvertTrangThai(Status);

        public virtual ICollection<Booking> Bookings { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public partial class BooKingServices : BaseEntity<int>
    {
        public int? IdBooking { get; set; }
        public int? IdServices { get; set; }
        public int quantity { get; set; }

        public virtual Booking IdBookingNavigation { get; set; }
        public virtual Servicess IdServicesNavigation { get; set; }
    }
}

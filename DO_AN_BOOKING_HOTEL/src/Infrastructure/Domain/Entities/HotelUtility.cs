using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class HotelUtility : BaseEntity<int>
    {

        public HotelUtility(int hotelId, int utilityId)
        {
            IdHotels = hotelId;
            IdUtilities = utilityId;
        }
        public HotelUtility()
        {
        }

        public int IdUtilities { get; set; }
        public int IdHotels { get; set; }

        public virtual Hotel IdHotelsNavigation { get; set; }
        public virtual Utility IdUtilitiesNavigation { get; set; }
    }
}

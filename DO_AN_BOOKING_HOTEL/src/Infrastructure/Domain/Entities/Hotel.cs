using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public partial class Hotel : BaseEntity<int>, IHasTrangThai
    {
        public Hotel()
        {
            ImageHotelRooms = new HashSet<ImageHotelRoom>();
            RoomTypes = new HashSet<RoomType>();
        }
        public string NameHotel { get; set; }
        public string Address { get; set; }
        public string Note { get; set; }
        public LoaiKhachSan? CategoryHotel { get; set; }
        public TrangThai Status { get; set; }
        public string StatusName => Common.ConvertTrangThai(Status);

        public virtual ICollection<ImageHotelRoom> ImageHotelRooms { get; set; }
        public virtual ICollection<RoomType> RoomTypes { get; set; }
        public virtual ICollection<HotelUtility> HotelUtilities { get; set; }
    }
}

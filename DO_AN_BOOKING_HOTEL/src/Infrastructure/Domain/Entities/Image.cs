using System;
using System.Collections.Generic;

#nullable disable

namespace Domain.Entities
{
    public partial class Image : BaseEntity<int>, IHasTrangThai
    {
        public Image()
        {
            ImageHotelRooms = new HashSet<ImageHotelRoom>();
        }

        public string ImageName { get; set; }
        public string Url { get; set; }
        public TrangThai Status { get; set; }
        public string StatusName => Common.ConvertTrangThai(Status);

        public virtual ICollection<ImageHotelRoom> ImageHotelRooms { get; set; }
    }
}

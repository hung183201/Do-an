using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.ViewModel.DanhMuc
{
    public class RoomTypeViewModel
    {
        public int Id { get; set; }
        public string NameRoomType { get; set; }
        public decimal? Price { get; set; }
        public int? TotalRoom { get; set; }
        public string Size { get; set; }
        public int? MaxPeople { get; set; }
        public int? TotalBed { get; set; }
        public string ExtraBed { get; set; }
        public int? IdHotel { get; set; }
        public TrangThai Status { get; set; }
    }
}

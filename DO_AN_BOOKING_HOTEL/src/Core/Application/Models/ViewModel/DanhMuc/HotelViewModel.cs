using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.ViewModel.DanhMuc
{
    public class HotelViewModel
    {
        public int Id { get; set; }
        public string NameHotel { get; set; }
        public string Address { get; set; }
        public string Note { get; set; }
        public int? CategoryHotel { get; set; }
        public TrangThai Status { get; set; }
    }
}

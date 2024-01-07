using Application.Mappings;
using Application.Models.ViewModel.DanhMuc;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.HotelDetail.Queries
{
    public class HotelDetailDto : IMapFrom<Domain.Entities.Hotel>
    {
        public string NameHotel { get; set; }
        public string Address { get; set; }
        public string Note { get; set; }
        public List<string> NameUtility{ get; set; }
       
    }
}

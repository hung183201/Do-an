using Application.Models.Requests;
using Application.Models.ViewModel.DanhMuc;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Abstractions.Services
{
    public interface IHotelServices : IBaseService<Hotel, int, HotelViewModel, HotelRequest>
    {

    }
}

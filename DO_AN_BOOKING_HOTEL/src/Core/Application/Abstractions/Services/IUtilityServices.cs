using Application.Models.Requests;
using Application.Models.ViewModel.DanhMuc;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Abstractions.Services;

namespace Application.Abstractions.Services
{
    public interface IUtilityServices : IBaseService<Utility, int, UtilityViewModel, UtilityRequest>
    {

    }
}

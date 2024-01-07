using Application.Models.ViewModel.DanhMuc;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Abstractions.Repository
{
    public interface IHotelUtilityGroupRepository : IRepository<HotelUtility>
    {
        IEnumerable<HotelUtility> GetHotelUtilityGroups(int count);
        
        IEnumerable<HotelUtility> GetHotelUtilityGroups(int hotelId, int[] utilityIds);

        IEnumerable<HotelUtility> GetHotelUtilityGroup(int hotelId, int utilityID);
       
        IEnumerable<HotelUtility> SearchHotelUtilityGroups(int hotelId, string actionFilter);
       
        IEnumerable<UtilityViewModel> GetUtilityByGroupId(int hotelId, bool isInGroup);
    }
}

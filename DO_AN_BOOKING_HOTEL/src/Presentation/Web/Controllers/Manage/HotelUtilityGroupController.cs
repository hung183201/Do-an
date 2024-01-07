using Application.Abstractions.Repository;
using Application.Models.ViewModel.DanhMuc;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Web.Controllers.Manage
{
    public class HotelUtilityGroupController : BaseController
    {
        private readonly IUnitOfWork _uow;

        public HotelUtilityGroupController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public IActionResult SearchUtilityByGroup(int hotelId, int utilityId, int isInGroup, string filter)
        {
            
            var Utility = GetUtilityByGroupId(hotelId, utilityId, isInGroup, filter);
            return Ok(Utility);
        }
        /// <summary>
        /// function tìm kiếm action theo id group và các tiêu chí khác
        /// </summary>
        /// <created by>HongDT</created by>
        /// <created date>12/12/2019</created date>
        /// <param name="groupId"></param>
        /// <param name="moduleId"></param>
        /// <param name="isInGroup"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        private IEnumerable<UtilityViewModel> GetUtilityByGroupId(int hotelId, int utilityId, int isInGroup, string filter)
        {
            IEnumerable<UtilityViewModel> Utility;
            if (!string.IsNullOrWhiteSpace(filter))
            {
                filter = filter.ToLower();
                Utility = _uow.GetCustomRepository<HotelUtility, IHotelUtilityGroupRepository>().GetUtilityByGroupId(hotelId, (isInGroup == 1) ? true : false)
                                            .Where(u => u.NameUtilities.ToLower().Contains(filter));
            }
            else
            {
                Utility = _uow.GetCustomRepository<HotelUtility, IHotelUtilityGroupRepository>().GetUtilityByGroupId(hotelId, (isInGroup == 1) ? true : false);
            }
            if (utilityId > 0)
            {
                Utility = Utility.Where(x => x.Id == utilityId);
            }

            return Utility;
        }
        /// <summary>
        /// Hàm insert Utility vào action group
        /// </summary>
        /// <created by>HongDT</created>
        /// <created date>17/12/2019</created>        
        /// <param name="groupId"></param>
        /// <param name="Utility"></param>
        [HttpPut("{hotelId}")]
        public void InsertUtilityIntoGroup(int hotelId, int[] UtilityIds)
        {
            List<HotelUtility> uug = new List<HotelUtility>();
            foreach (var utilityId in UtilityIds)
            {
                uug.Add(new HotelUtility(hotelId, utilityId));
            }
            _uow.GetCustomRepository<HotelUtility, IHotelUtilityGroupRepository>().AddRange(uug);
            _uow.SaveChanges();
            uug = null;
        }
        /// <summary>
        /// Hàm insert action vào action group
        /// </summary>
        /// <created by>HongDT</created>
        /// <created date>17/12/2019</created>
        /// <param name="groupId"></param>
        /// <param name="Utility"></param>
        [HttpPut("{hotelId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public void DeleteUtilityFromGroup(int hotelId, int[] Utility)
        {
            //Lấy toàn bộ ds action action groups
            var actionActionGroups = _uow.GetCustomRepository<HotelUtility, IHotelUtilityGroupRepository>().GetHotelUtilityGroups(hotelId, Utility);
            if (actionActionGroups.Count() > 0)
            {
                _uow.GetCustomRepository<HotelUtility, IHotelUtilityGroupRepository>().RemoveRange(actionActionGroups);
                _uow.SaveChanges();
            }
            actionActionGroups = null;
        }
    }
}

using Application.Abstractions.Repository;
using Application.Models.ViewModel.DanhMuc;
using Domain.Entities;
using Infrastructure.EF;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;


namespace Infrastructure.Repository
{
    
    public class HotelUtilityGroupRepository : Repository<HotelUtility>, IHotelUtilityGroupRepository
    {
        private DBBOOKINGHOTELContext _appContext => (DBBOOKINGHOTELContext)Context;
        public HotelUtilityGroupRepository(DBBOOKINGHOTELContext context) : base(context)
        {
        }

        public IEnumerable<HotelUtility> GetHotelUtilityGroup(int hotelId, int utilityID)
        {
            var query = from u in _appContext.HotelUtilities
                        where u.IdHotels == hotelId && u.IdUtilities == utilityID
                        select u;

            return query.ToList();
        }

        public IEnumerable<HotelUtility> GetHotelUtilityGroups(int count)
        {
            
            throw new NotImplementedException();

        }

        public IEnumerable<HotelUtility> GetHotelUtilityGroups(int hotelId, int[] utilityIds)
        {
            //var query = from u in _appContext.HotelUtilities
            //            where u.IdHotels == hotelId 
            //            && utilityIds.Any(x => x == u.IdUtilities)
            //            select u;

            var query = _appContext.HotelUtilities.Where(x => x.IdHotels == hotelId && utilityIds.Any(u => u == x.IdUtilities)).ToList();

            return query.ToList();
        }

        public IEnumerable<UtilityViewModel> GetUtilityByGroupId(int hotelId, bool isInGroup)
        {
            IQueryable<UtilityViewModel> query;
            if (isInGroup)
            {
                query = (from u in _appContext.Utilities
                         where _appContext.HotelUtilities.Any(aag => aag.IdUtilities == u.Id
                                                                    && aag.IdHotels == hotelId) &&
                                u.UtilitiesType == 1 &&
                               u.Status == TrangThai.Active
                         select new UtilityViewModel
                         {
                             Id = u.Id,
                             NameUtilities = u.NameUtilities,
                         });
            }
            else
            {
                query = (from u in _appContext.Utilities
                         where !_appContext.HotelUtilities.Any(aag => aag.IdUtilities == u.Id
                                                                    && aag.IdHotels == hotelId) &&
                                u.UtilitiesType == 1 &&
                               u.Status == TrangThai.Active
                         select new UtilityViewModel
                         {
                             Id = u.Id,
                             NameUtilities = u.NameUtilities,
                         });
            }
            return query.ToList();
        }

        public IEnumerable<HotelUtility> SearchHotelUtilityGroups(int hotelId, string actionFilter)
        {
            IQueryable<HotelUtility> query;
            if (String.IsNullOrEmpty(actionFilter))
            {
                query = from u in _appContext.HotelUtilities
                        join a in _appContext.Utilities on u.IdUtilities equals a.Id
                        where u.IdHotels == hotelId
                            && a.Status == TrangThai.Active
                        select u;
            }
            else
            {
                query = from u in _appContext.HotelUtilities
                        join a in _appContext.Utilities on u.IdUtilities equals a.Id
                        where u.IdHotels == hotelId
                            && (a.NameUtilities.ToLower().Contains(actionFilter))
                            && a.Status == TrangThai.Active
                        select u;
            }
            return query.ToList();
        }
    }
}

using Application.Abstractions.Repository;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Features.HotelDetail.Queries
{
    public class HotelDetailQueryHandler : IRequestHandler<HotelDetailQuery, IList<HotelDetailDto>>
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public HotelDetailQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _uow = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IList<HotelDetailDto>> Handle(HotelDetailQuery request, CancellationToken cancellationToken)
        {
            //var query = from dvhc in Context.Set<Dvhc>().IgnoreQueryFilters()
            //    where dvhc.MucDvhc == 1
            //    select new CommonObjectViewModel
            //    {
            //        Id = dvhc.Id,
            //        Code = dvhc.MaTinh,
            //        Value = dvhc.TenDvhc
            //    };
            //(await _uow.GetRepository<BuocXuLy>().WhereAsync(x => dsIdBuocXuLyTruoc.Contains(x.Id) && x.IdBuoc != buocXuLyHienTai.IdBuoc, include: ic => ic.Include(b => b.Buoc),
            //        selector: sc => new
            //        {
            //            sc.Id,
            //            sc.Buoc.TenBuoc,
            //            sc.DsIdNguoiXuLy
            //        })).ToList();
            var result = await _uow.GetRepository<Hotel>().WhereAsync(x => x.Id == request.IdHotel,
                 null,selector: sc => new HotelDetailDto
                 {
                     NameHotel = sc.NameHotel,
                     Address = sc.Address,
                     Note = sc.Note,
                     NameUtility = sc.HotelUtilities.Select(x => x.IdUtilitiesNavigation.NameUtilities).ToList(),
                 });
            return result.ToList();
        }
    }
}

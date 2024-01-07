using Application.Abstractions;
using Application.Abstractions.Repository;
using Application.Abstractions.Services;
using Application.Models.Requests;
using Application.Models.ViewModel.DanhMuc;
using Common.Extensions;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services.DanhMuc
{
    public class RoomtypeService : IRoomTypeServices { 
        
        
        private readonly IUnitOfWork _uow;
        private readonly IValidationService<RoomTypeViewModel, RoomType, int> _validationService;

        public RoomtypeService(IUnitOfWork unitOfWork, IValidationService<RoomTypeViewModel, RoomType, int> validationService)
        {
            _uow = unitOfWork;
            _validationService = validationService;
        }
        
        public async Task<RoomType> Add(RoomTypeViewModel obj)
        {
            obj.NameRoomType = obj.NameRoomType.Trim();
            //obj.Size = obj.Size.Trim(); 

            //_validationService.ValidateInserting(obj);
            var entity = new RoomType()
            {
                Id = obj.Id,
                NameRoomType = obj.NameRoomType,
                Price = obj.Price,
                TotalRoom = obj.TotalRoom,
                Size = obj.Size,
                MaxPeople = obj.MaxPeople,
                TotalBed = obj.TotalBed,
                ExtraBed = obj.ExtraBed,
                IdHotel = obj.IdHotel,
            };

            await _uow.GetRepository<RoomType>().AddAsync(entity);
            await _uow.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> Delete(int id)
        {
            var data = _validationService.ValidateDeleting(id);
            _uow.GetRepository<RoomType>().Remove(data);
            var result = await _uow.SaveChangesAsync();
            return result > 0;
        }

        public async Task<RoomType> Edit(RoomTypeViewModel obj)
        {
            _validationService.ValidateUpdating(obj);
            var data = await _uow.GetRepository<RoomType>().FirstOrDefaultAsync(x => x.Id == obj.Id, disableActiveFilter: true);
            if (data != null)
            {
                data.NameRoomType = obj.NameRoomType;
                data.Price = obj.Price;
                data.TotalRoom = obj.TotalRoom;
                data.Size = obj.Size;
                data.MaxPeople = obj.MaxPeople;
                data.TotalBed = obj.TotalBed;
                data.ExtraBed = obj.ExtraBed;
                data.IdHotel = obj.IdHotel;

                _uow.GetRepository<RoomType>().Update(data);
                await _uow.SaveChangesAsync();
            }
            return data;
        }

        public async Task<IList<RoomType>> GetAll()
        {
            var result = (await _uow.GetRepository<RoomType>().WhereAsync(orderBy: p => p.OrderBy(or => or.NameRoomType))).ToList();
            return result;
        }

        public async Task<RoomType> GetById(int id)
        {
            var data = await _uow.GetRepository<RoomType>().FirstOrDefaultAsync(x => x.Id == id, disableActiveFilter: true);
            return data;
        }

        public async Task<IPagedList<RoomType>> Search(RoomtypeRequest request)
        {
            Expression<Func<RoomType, bool>> filter = x => true;
            if (!string.IsNullOrWhiteSpace(request.FullTextSearch))
            {
                var fullTextSearch = request.FullTextSearch.ToLowerInvariant();
                filter = filter.And(p => p.NameRoomType.ToLower().Contains(fullTextSearch)
                                        
                    );
            }
            var result = await _uow.GetRepository<RoomType>().ToPagedListAsync(filter, orderBy: p => p.OrderByDescending(or => or.NgayTao), null, request.PageNumber, request.PageSize, request.RowModify, true, true);
            return result;
        }
    }
}

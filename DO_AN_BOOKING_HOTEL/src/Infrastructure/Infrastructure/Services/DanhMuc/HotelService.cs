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
    public class HotelService : IHotelServices
    {
        private readonly IUnitOfWork _uow;
        private readonly IValidationService<HotelViewModel, Hotel, int> _validationService;

        public HotelService(IUnitOfWork unitOfWork, IValidationService<HotelViewModel, Hotel, int> validationService)
        {
            _uow = unitOfWork;
            _validationService = validationService;
        }
        public async Task<Hotel> Add(HotelViewModel obj)
        {
            obj.NameHotel = obj.NameHotel.Trim();
            obj.Address = obj.Address.Trim(); ;

           // _validationService.ValidateInserting(obj);
            var entity = new Hotel()
            {
                NameHotel = obj.NameHotel,
                Address = obj.Address,
                Note = obj.Note,
                CategoryHotel = (LoaiKhachSan)obj.CategoryHotel,
                Status = (TrangThai)obj.Status
            };

            await _uow.GetRepository<Hotel>().AddAsync(entity);
            await _uow.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> Delete(int id)
        {
            var data = _validationService.ValidateDeleting(id);
            _uow.GetRepository<Hotel>().Remove(data);
            var result = await _uow.SaveChangesAsync();
            return result > 0;
        }

        public async Task<Hotel> Edit(HotelViewModel obj)
        {
            _validationService.ValidateUpdating(obj);
            var data = await _uow.GetRepository<Hotel>().FirstOrDefaultAsync(x => x.Id == obj.Id, disableActiveFilter: true);
            if (data != null)
            {
                data.NameHotel = obj.NameHotel;
                data.Address = obj.Address;
                data.Note = obj.Note;
                data.CategoryHotel = (LoaiKhachSan)obj.CategoryHotel;
                data.Status = (TrangThai)obj.Status;
                _uow.GetRepository<Hotel>().Update(data);
                await _uow.SaveChangesAsync();
            }
            return data;
        }

        public async Task<IList<Hotel>> GetAll()
        {
            var result = (await _uow.GetRepository<Hotel>().WhereAsync(orderBy: p => p.OrderBy(or => or.NameHotel))).ToList();
            return result;
        }

        public async Task<Hotel> GetById(int id)
        {
            var data = await _uow.GetRepository<Hotel>().FirstOrDefaultAsync(x => x.Id == id, disableActiveFilter: true);
            return data;
        }

        public async Task<IPagedList<Hotel>> Search(HotelRequest request)
        {
            Expression<Func<Hotel, bool>> filter = x => true;
            if (!string.IsNullOrWhiteSpace(request.FullTextSearch))
            {
                var fullTextSearch = request.FullTextSearch.ToLowerInvariant();
                filter = filter.And(p => p.NameHotel.ToLower().Contains(fullTextSearch)
                                         || p.Note.ToLower().Contains(fullTextSearch)
                    );
            }
            var result = await _uow.GetRepository<Hotel>().ToPagedListAsync(filter, orderBy: p => p.OrderByDescending(or => or.NgayTao), null, request.PageNumber, request.PageSize, request.RowModify, true,true);
            return result;
        }
    }
}

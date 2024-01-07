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
    public class UtilityService : IUtilityServices
    {
        private readonly IUnitOfWork _uow;
        private readonly IValidationService<UtilityViewModel, Domain.Entities.Utility, int> _validationService;
        public UtilityService(IUnitOfWork unitOfWork, IValidationService<UtilityViewModel, Domain.Entities.Utility, int> validationService)
        {
            _uow = unitOfWork;
            _validationService = validationService;
        }
        public async Task<Domain.Entities.Utility> Add(UtilityViewModel obj)
        {
            obj.NameUtilities = obj.NameUtilities.Trim();
            obj.UtilitiesType = obj.UtilitiesType;

            _validationService.ValidateInserting(obj);
            var entity = new Domain.Entities.Utility()
            {
                NameUtilities = obj.NameUtilities,
                Icon = obj.Icon,
                UtilitiesType = obj.UtilitiesType,
                Status = (TrangThai)obj.Status
            };

            await _uow.GetRepository<Domain.Entities.Utility>().AddAsync(entity);
            await _uow.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> Delete(int id)
        {
            var data = _validationService.ValidateDeleting(id);
            _uow.GetRepository<Domain.Entities.Utility>().Remove(data);
            var result = await _uow.SaveChangesAsync();
            return result > 0;
        }

        public async Task<Domain.Entities.Utility> Edit(UtilityViewModel obj)
        {
            _validationService.ValidateUpdating(obj);
            var data = await _uow.GetRepository<Domain.Entities.Utility>().FirstOrDefaultAsync(x => x.Id == obj.Id, disableActiveFilter: true);
            if (data != null)
            {
                data.NameUtilities = obj.NameUtilities;
                data.Icon = obj.Icon;
                data.UtilitiesType = obj.UtilitiesType;
                data.Status = (TrangThai)obj.Status;
                _uow.GetRepository<Domain.Entities.Utility>().Update(data);
                await _uow.SaveChangesAsync();
            }
            return data;
        }

        public async Task<IList<Domain.Entities.Utility>> GetAll()
        {
            var result = (await _uow.GetRepository<Domain.Entities.Utility>().WhereAsync(orderBy: p => p.OrderBy(or => or.NameUtilities))).ToList();
            return result;
        }

        public async Task<Domain.Entities.Utility> GetById(int id)
        {
            var data = await _uow.GetRepository<Domain.Entities.Utility>().FirstOrDefaultAsync(x => x.Id == id, disableActiveFilter: true);
            return data;
        }

        public async Task<IPagedList<Domain.Entities.Utility>> Search(UtilityRequest request)
        {
            Expression<Func<Domain.Entities.Utility, bool>> filter = x => true;
            if (!string.IsNullOrWhiteSpace(request.FullTextSearch))
            {
                var fullTextSearch = request.FullTextSearch.ToLowerInvariant();
                filter = filter.And(p => p.NameUtilities.ToLower().Contains(fullTextSearch)
                && p.UtilitiesType == request.UtilitiesType
                                        
                    );
            }
            filter = filter.And(x => (x.UtilitiesType == request.UtilitiesType));
            var result = await _uow.GetRepository<Domain.Entities.Utility>().ToPagedListAsync(filter, orderBy: p => p.OrderByDescending(or => or.NgayTao), null, request.PageNumber, request.PageSize, request.RowModify, true,true);
            return result;
        }
    }
}

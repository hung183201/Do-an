using Application.Abstractions.Repository;
using Application.Abstractions.Services;
using Application.Models.ViewModel.DanhMuc;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Exceptions;
using FluentValidation.Results;


namespace Infrastructure.Services.ValidationService
{
    internal class UtilityValidationService : IValidationService<UtilityViewModel, Utility, int>
    {
        private readonly IUnitOfWork _uow;
        //private readonly IBaseValidationRules<LoaiGiayToViewModel> _modelValidationRule;

        public UtilityValidationService(IUnitOfWork uow)
        {
            _uow = uow;
            //_modelValidationRule = modelValidationRule;
        }
        public  Utility ValidateDeleting(int id)
        {
            var item = ValidateEntityNotFound(id);
            
            return item;
        }

        public  Utility ValidateEntityNotFound(int id)
        {
            var item =  _uow.GetRepository<Utility>().FirstOrDefault(x => x.Id == id, disableActiveFilter: true);
            if (item == null || item.Id <= 0)
            {
                throw new FriendlyException("Tiện ích không tồn tại.");
            }

            return item;
        }

        public void ValidateInputInformation(UtilityViewModel entity)
        {
            //ValidationResult results = _modelValidationRule.Validate(entity);
            //if (!results.IsValid)
            //{
            //    throw new FriendlyException(results.ToString("~"));
            //}
        }

        public void ValidateInserting(UtilityViewModel entity)
        {
            ValidateInputInformation(entity);

            if (!string.IsNullOrWhiteSpace(entity.NameUtilities))
            {
                var nameUtilities = entity.NameUtilities.ToLower();
                var check = _uow.GetRepository<Utility>().Where(x => x.NameUtilities.ToLower() == nameUtilities);
                if (check.Any())
                {
                    throw new FriendlyException("Tên dịch vụ đã tồn tại. Vui lòng nhập lại.");
                }
            }
        }

        public void ValidateUpdating(UtilityViewModel entity)
        {
            ValidateInputInformation(entity);

            var item = ValidateEntityNotFound(entity.Id);

            if (item.NameUtilities.ToLower() != entity.NameUtilities.ToLower())
            {
                var check = _uow.GetRepository<Utility>().Where(x => x.NameUtilities.ToLower() == entity.NameUtilities.ToLower() && x.Id != entity.Id);
                if (check.Any())
                {
                    throw new FriendlyException("Tên loại giấy tờ đã tồn tại. Vui lòng nhập lại.");
                }
            }
        }
    }
}

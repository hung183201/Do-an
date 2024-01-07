using Application.Abstractions.Repository;
using Application.Abstractions.Services;
using Application.Exceptions;
using Application.Models.ViewModel.DanhMuc;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation.Results;


namespace Infrastructure.Services.ValidationService
{
    public class HotelValidationService : IValidationService<HotelViewModel, Hotel, int>
    {
        private readonly IUnitOfWork _uow;
        //private readonly IBaseValidationRules<HotelViewModel> _modelValidationRule;

        public HotelValidationService(IUnitOfWork uow)
        {
            _uow = uow;
            //_modelValidationRule = modelValidationRule;
        }
        public Hotel ValidateDeleting(int id)
        {
            var item = ValidateEntityNotFound(id);
            
            return item;
        }

        public Hotel ValidateEntityNotFound(int id)
        {
            var item = _uow.GetRepository<Hotel>().FirstOrDefault(x => x.Id == id, disableActiveFilter: true);
            if (item == null || item.Id <= 0)
            {
                throw new FriendlyException("Khách sạn không tồn tại.");
            }

            return item;
        }

        public void ValidateInputInformation(HotelViewModel entity)
        {
            //ValidationResult results = _modelValidationRule.Validate(entity);
            //if (!results.IsValid)
            //{
            //    throw new FriendlyException(results.ToString("~"));
            //}
        }

        public void ValidateInserting(HotelViewModel entity)
        {
            ValidateInputInformation(entity);

            if (!string.IsNullOrWhiteSpace(entity.NameHotel))
            {
                var nameUtilities = entity.NameHotel.ToLower();
                var check = _uow.GetRepository<Hotel>().Where(x => x.NameHotel.ToLower() == nameUtilities);
                if (check.Any())
                {
                    throw new FriendlyException("Tên Khách sạn đã tồn tại. Vui lòng nhập lại.");
                }
            }
        }

        public void ValidateUpdating(HotelViewModel entity)
        {
           // ValidateInputInformation(entity);

            var item = ValidateEntityNotFound(entity.Id);

            if (item.NameHotel.ToLower() != entity.NameHotel.ToLower())
            {
                var check = _uow.GetRepository<Hotel>().Where(x => x.NameHotel.ToLower() == entity.NameHotel.ToLower() && x.Id != entity.Id);
                if (check.Any())
                {
                    throw new FriendlyException("Tên Khách sạn đã tồn tại. Vui lòng nhập lại.");
                }
            }
        }
    }
}

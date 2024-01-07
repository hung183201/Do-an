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

namespace Infrastructure.Services.ValidationService
{
    internal class RoomtypeValidationService : IValidationService<RoomTypeViewModel, RoomType, int>
    {
        private readonly IUnitOfWork _uow;
        //private readonly IBaseValidationRules<HotelViewModel> _modelValidationRule;

        public RoomtypeValidationService(IUnitOfWork uow)
        {
            _uow = uow;
            //_modelValidationRule = modelValidationRule;
        }

        public RoomType ValidateDeleting(int id)
        {
            var item = ValidateEntityNotFound(id);
           
            return item;
        }

        public RoomType ValidateEntityNotFound(int id)
        {
            var item = _uow.GetRepository<RoomType>().FirstOrDefault(x => x.Id == id, disableActiveFilter: true);
            if (item == null || item.Id <= 0)
            {
                throw new FriendlyException("Phòng không tồn tại");
            }

            return item;
        }

        public void ValidateInputInformation(RoomTypeViewModel entity)
        {
            //ValidationResult results = _modelValidationRule.Validate(entity);
            //if (!results.IsValid)
            //{
            //    throw new FriendlyException(results.ToString("~"));
            //}
        }

        public void ValidateInserting(RoomTypeViewModel entity)
        {
            ValidateInputInformation(entity);

            if (!string.IsNullOrWhiteSpace(entity.NameRoomType))
            {
                var nameUtilities = entity.NameRoomType.ToLower();
                var check = _uow.GetRepository<RoomType>().Where(x => x.NameRoomType.ToLower() == nameUtilities);
                if (check.Any())
                {
                    throw new FriendlyException("Tên phòng đã tồn tại. Vui lòng nhập lại.");
                }
            }
        }

        public void ValidateUpdating(RoomTypeViewModel entity)
        {
            // ValidateInputInformation(entity);

            var item = ValidateEntityNotFound(entity.Id);

            if (item.NameRoomType.ToLower() != entity.NameRoomType.ToLower())
            {
                var check = _uow.GetRepository<RoomType>().Where(x => x.NameRoomType.ToLower() == entity.NameRoomType.ToLower() && x.Id != entity.Id);
                if (check.Any())
                {
                    throw new FriendlyException("Tên phòng đã tồn tại. Vui lòng nhập lại.");

                }
            }
        }
    }
}

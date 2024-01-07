using Application.Abstractions;
using Application.Abstractions.Services;
using Application.Models;
using Application.Models.Requests;
using Application.Models.ViewModel.DanhMuc;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers.Manage
{
    public class HotelManageController : BaseController
    {
        private readonly IHotelServices _hotelService;
        public HotelManageController(IHotelServices hotelService)
        {
            _hotelService = hotelService;
        }

        /// <summary>
        /// Thêm lĩnh vực
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResult<string>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResult<string>>> Add([FromBody] HotelViewModel command)
        {

            var result = await _hotelService.Add(command);
            return Ok(new ApiResult<Hotel> { Data = result });
        }

        /// <summary>
        /// Sửa Utility
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResult<string>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResult<string>>> Edit([FromBody] HotelViewModel command)
        {

            var result = await _hotelService.Edit(command);
            return Ok(new ApiResult<Hotel> { Data = result });
        }

        /// <summary>
        /// Xóa Utility
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResult<string>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResult<bool>>> Delete(int id)
        {

            var result = await _hotelService.Delete(id);
            return Ok(new ApiResult<bool> { Data = result });
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResult<string>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResult<Hotel>>> GetById(int id)
        {

            var result = await _hotelService.GetById(id);
            return Ok(new ApiResult<Hotel> { Data = result });
        }

        /// <summary>
        /// Lấy toàn bộ loại giấy tờ
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResult<IList<Hotel>>>> GetAll()
        {
            var result = await _hotelService.GetAll();
            return Ok(new ApiResult<IList<Hotel>> { Data = result });
        }
      
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResult<PagedList<Hotel>>>> Search([FromBody] HotelRequest request)
        {
            var result = await _hotelService.Search(request);
            return Ok(new ApiResult<IPagedList<Hotel>> { Data = result });

        }

    }
}

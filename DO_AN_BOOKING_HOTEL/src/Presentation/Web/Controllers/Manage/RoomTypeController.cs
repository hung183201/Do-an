using Application.Abstractions;
using Application.Abstractions.Services;
using Application.Models;
using Application.Models.Requests;
using Application.Models.ViewModel.DanhMuc;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Web.Controllers.Manage
{
    public class RoomTypeController : BaseController
    {
        private readonly IRoomTypeServices _roomtypeService;
        public RoomTypeController(IRoomTypeServices hotelService)
        {
            _roomtypeService = hotelService;
        }

        /// <summary>
        /// Thêm lĩnh vực
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResult<string>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResult<string>>> Add([FromBody] RoomTypeViewModel command)
        {

            var result = await _roomtypeService.Add(command);
            return Ok(new ApiResult<RoomType> { Data = result });
        }

        /// <summary>
        /// Sửa Roomtype
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResult<string>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResult<string>>> Edit([FromBody] RoomTypeViewModel command)
        {

            var result = await _roomtypeService.Edit(command);
            return Ok(new ApiResult<RoomType> { Data = result });
        }

        /// <summary>
        /// Xóa Roomtype
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResult<string>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResult<bool>>> Delete(int id)
        {

            var result = await _roomtypeService.Delete(id);
            return Ok(new ApiResult<bool> { Data = result });
        }

        /// <summary>
        /// Tìm kiếm thủ tục theo các tiêu chí khác nhau, có thể phân trang.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResult<PagedList<RoomType>>>> Search([FromBody] RoomtypeRequest request)
        {
            var result = await _roomtypeService.Search(request);
            return Ok(new ApiResult<IPagedList<RoomType>> { Data = result });

        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResult<string>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResult<RoomType>>> GetById(int id)
        {

            var result = await _roomtypeService.GetById(id);
            return Ok(new ApiResult<RoomType> { Data = result });
        }

    }
}

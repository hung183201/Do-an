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
    public class UtilityManageController : BaseController
    {
        private readonly IUtilityServices _utilityService;
        public UtilityManageController(IUtilityServices utilityService)
        {
            _utilityService = utilityService;
        }

        /// <summary>
        /// Thêm lĩnh vực
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResult<string>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResult<string>>> Add([FromBody] UtilityViewModel command)
        {

            var result = await _utilityService.Add(command);
            return Ok(new ApiResult<Utility> { Data = result });
        }

        /// <summary>
        /// Sửa Utility
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResult<string>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResult<string>>> Edit([FromBody] UtilityViewModel command)
        {

            var result = await _utilityService.Edit(command);
            return Ok(new ApiResult<Utility> { Data = result });
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

            var result = await _utilityService.Delete(id);
            return Ok(new ApiResult<bool> { Data = result });
        }

        /// <summary>
        /// Tìm kiếm thủ tục theo các tiêu chí khác nhau, có thể phân trang.
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResult<PagedList<Utility>>>> Search([FromBody] UtilityRequest request)
        {
            var result = await _utilityService.Search(request);
            return Ok(new ApiResult<IPagedList<Utility>> { Data = result });

        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResult<string>), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApiResult<Utility>>> GetById(int id)
        {

            var result = await _utilityService.GetById(id);
            return Ok(new ApiResult<Utility> { Data = result });
        }
    }
}

using Application.Abstractions;
using Application.Features.HotelDetail.Queries;
using Application.Models;
using Application.Models.Requests;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers
{
    public class HotelDetailsController : BaseController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<ApiResult<IList<HotelDetailDto>>>> Search(int Idhotel)
        {
            var result = await Mediator.Send(new HotelDetailQuery()
            {
                IdHotel = Idhotel
            });
            return Ok(new ApiResult<IList<HotelDetailDto>> { Data = result });

        }
    }
}

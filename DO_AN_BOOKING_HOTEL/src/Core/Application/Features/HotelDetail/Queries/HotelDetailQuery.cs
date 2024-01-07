using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.HotelDetail.Queries
{
    public class HotelDetailQuery : IRequest<IList<HotelDetailDto>>
    {
        public int IdHotel { get; set; }
    }
}

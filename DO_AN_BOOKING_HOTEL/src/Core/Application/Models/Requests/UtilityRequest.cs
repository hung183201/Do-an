﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Models.Requests
{
    public class UtilityRequest : PagingRequest
    {
        public int? UtilitiesType { get; set; }
    }
}

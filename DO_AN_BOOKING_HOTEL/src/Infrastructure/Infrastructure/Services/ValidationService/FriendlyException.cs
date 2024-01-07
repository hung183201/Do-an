using Application.Enums;
using Application.Exceptions;
using System;
using System.Collections.Generic;
using System.Net;
using System.Runtime.Serialization;

namespace Infrastructure.Services.ValidationService
{
    [Serializable]
    internal class FriendlyException : Exception
    {
        public HttpStatusCode StatusCode { get; set; }

        public ApiCode ApiErrorCode { get; set; }

        public List<ValidationError> Errors { get; set; }

        public FriendlyException(string message, ApiCode apiErrorCode = ApiCode.BusinessError, HttpStatusCode statusCode = HttpStatusCode.OK, List<ValidationError> errors = null) :
            base(message)
        {
            StatusCode = statusCode;
            Errors = errors;
            ApiErrorCode = apiErrorCode;
        }
        public FriendlyException(Exception ex, ApiCode apiErrorCode = ApiCode.BusinessError, HttpStatusCode statusCode = HttpStatusCode.OK) : base(ex.Message)
        {
            StatusCode = statusCode;
            ApiErrorCode = apiErrorCode;
        }
    }
}
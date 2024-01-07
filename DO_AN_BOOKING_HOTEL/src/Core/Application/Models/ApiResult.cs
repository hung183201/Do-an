using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Application.Enums;
using Application.Exceptions;

namespace Application.Models
{
    /// <summary>
    /// Wrapper around the real business API data (in Data property) to add API exec error information
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ApiResult<T>
    {
        public ApiResult()
        {

        }

        public ApiResult(T data)
        {
            Data = data;
        }

        public ApiResult(T data, bool isError = false, string message = "", ApiCode apiCode = ApiCode.Success) :
            this(isError, message)
        {
            Data = data;
            IsError = isError;
            Message = message;
            Code = apiCode;
        }

        public ApiResult(bool isError = false, string message = "", ApiCode apiCode = ApiCode.Success)
        {
            IsError = isError;
            Message = message;
            Code = apiCode;
        }

        public ApiResult(ModelStateDictionary modelState)
        {
            this.IsError = true;
            Code = ApiCode.BusinessError;
            Message = "Validation Failed";
            Errors = modelState.Keys
                .SelectMany(key => modelState[key].Errors.Select(x => new ValidationError(key, x.ErrorMessage)))
                .ToList();
        }

        /// <summary>
        /// false: API exec success
        /// true: API exec error
        /// </summary>
        public bool IsError { get; set; }

        /// <summary>
        /// if IsError is true: contains error message
        /// if IsError is false: empty or contains additional API exec information
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// The real data return by the API
        /// </summary>
        public T Data { get; set; }

        public ApiCode Code { get; set; }
        public List<ValidationError> Errors { get; set; }


        public virtual ApiResult<T> OnError(string errorMessage)
        {
            IsError = true;
            Message = errorMessage;
            Code = ApiCode.GeneralError;
            return this;
        }

        public virtual ApiResult<T> OnSuccess(string successMessage = "")
        {
            Code = ApiCode.Success;
            IsError = false;
            Message = successMessage;
            return this;
        }




    }
}


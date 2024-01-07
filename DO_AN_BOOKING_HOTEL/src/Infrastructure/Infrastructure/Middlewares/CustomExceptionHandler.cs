using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Application.Abstractions;
using Application.Enums;
using Application.Exceptions;
using Application.Models;
using Common;
using Infrastructure.Services.ValidationService;
//using Common.Log;

namespace Infrastructure.Middlewares
{
    public class CustomExceptionHandler
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<CustomExceptionHandler> _logger;
        //private readonly ILogger<LogBusinessModel> _loggerBusiness;
        private IWebHostEnvironment _env;

        public CustomExceptionHandler(RequestDelegate next, ILogger<CustomExceptionHandler> logger, IWebHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            //_loggerBusiness = loggerBusiness;
            _env = env;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            ApiResult<string> apiError = new ApiResult<string> { IsError = true };
            var httpStatusCode = HttpStatusCode.InternalServerError;
            var randomCode = StringHelper.RandomAlphaBetString(4);
            string maLoi = "UE - " + randomCode;
            apiError.Code = ApiCode.InternalError;
            if (_env.IsDevelopment())
            {
                apiError.Message = "Message: " + exception.Message
                                           + "\r\nStackTrace: " + exception.StackTrace
                                           + "\r\nInnerMessage: " + exception.InnerException?.Message
                                           + "\r\nInnerStackTrace: " + exception.InnerException?.StackTrace;
            }
            else
            {
                apiError.Message = maLoi + ": " + "Có lỗi xảy ra phía hệ thống. Liên hệ với bộ phận quản trị để khắc phục.";
            }

            switch (exception)
            {
                case ValidationException validationException:
                    var firstError = validationException.Failures.FirstOrDefault().Value;
                    httpStatusCode = HttpStatusCode.OK;
                    maLoi = "VE - " + randomCode;
                    apiError.Message = maLoi + ": " + string.Join("; ", firstError);
                    apiError.Code = ApiCode.ValidationError;
                    apiError.Errors = validationException.Failures.Select(x => new ValidationError(x.Key, string.Join("; ", x.Value))).ToList();
                    break;
                case NotFoundException notFontException:
                    httpStatusCode = HttpStatusCode.NotFound;
                    maLoi = "NFE - " + randomCode;
                    apiError.Message = maLoi + ": " + notFontException.Message;
                    apiError.Code = ApiCode.NotFoundError;
                    break;
                case FriendlyException friendlyException:
                    httpStatusCode = friendlyException.StatusCode;
                    maLoi = "FRE - " + randomCode;
                    apiError.Message = maLoi + ": " + friendlyException.Message;
                    apiError.Code = ApiCode.BusinessError;
                    break;
                case UnauthorizedAccessException unauthorizedAccessException:

                    httpStatusCode = HttpStatusCode.Unauthorized;
                    maLoi = "UAE - " + randomCode;
                    apiError.Code = ApiCode.UnAuthorizedAccess;
                    apiError.Message = maLoi + ": " + unauthorizedAccessException.Message;

                    break;

            }
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)httpStatusCode;
            return context.Response.WriteAsync(JsonConvert.SerializeObject(apiError, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            }));
        }
    }

    public static class CustomExceptionHandlerExtensions
    {
        public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CustomExceptionHandler>();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Localization;
using Application.Abstractions;
using Application.Abstractions.Repository;
using Application.Abstractions.Services;
using Application.Extensions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Application.Models.ViewModel.DanhMuc;
using Infrastructure.Services.ValidationService;
using Domain.Entities;
using Infrastructure.Services.DanhMuc;
using Infrastructure.EF;
using Application.Enums;
using NSwag;
using NSwag.Generation.Processors.Security;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Identity;
using Application.Models.Validator.Base;
using Common;
//using LoaiHoSo = Domain.Entities.LoaiHoSo;

namespace Infrastructure
{
    public static class ServicesExtensions
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
            });
           
            services.AddIdentity<AppUser, AppRole>()
                .AddEntityFrameworkStores<DBBOOKINGHOTELContext>()
                .AddDefaultTokenProviders();

            services.AddUnitOfWork<DBBOOKINGHOTELContext>();
            services.AddValidationRules();
            services.AddValidationServices();
            services.AddBusinessServices();
            services.AddCustomRepositories();
            //services.AddTransient<ICsvFileBuilder, CsvFileBuilder>();
            services.AddCustomCors(configuration)
                .AddCustomUi(environment);
            //services.AddHealthCheck(Configuration);
            //services.AddTransient<ICommonService, CommonService>();
            services.AddHttpContextAccessor()
                .AddResponseCompression()
                .AddMemoryCache()
                .AddHealthChecks();
           
            return services;
        }

        public static IServiceCollection AddInfrastructureForTesting(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {


            services.AddValidationRules();
            services.AddValidationServices();
            services.AddBusinessServices();
            services.AddCustomRepositories();

            services.AddHttpContextAccessor();
            return services;
        }

        private static IServiceCollection AddCustomUi(this IServiceCollection services, IWebHostEnvironment environment)
        {
            services.AddOpenApiDocument(configure =>
            {
                configure.Title = "BOOKING HOTEL API";
                configure.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
                {
                    Type = OpenApiSecuritySchemeType.ApiKey,
                    Name = "Authorization",
                    In = OpenApiSecurityApiKeyLocation.Header,
                    Description = "Type into the textbox: Bearer {your JWT token}."
                });

                configure.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
            });

            // Customise default API behaviour
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            var controllerWithViews = services.AddControllersWithViews();
            var razorPages = services.AddRazorPages()
            .AddViewLocalization()
            .AddDataAnnotationsLocalization();

            if (environment.IsDevelopment())
            {
                controllerWithViews.AddRazorRuntimeCompilation();
                razorPages.AddRazorRuntimeCompilation();
            }

            return services;
        }
        private static IServiceCollection AddCustomCors(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(Constants.DefaultCorsPolicy,
                    builder =>
                    {
                        //TODO: Tạm thời ignore cors
                        var corsList = configuration.GetSection("CorsOrigins").Get<List<string>>()?.ToArray() ?? new string[] { };
                        builder.WithOrigins(corsList)
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });


            return services;
        }

        //private static void AddCustomHttpClient(this IServiceCollection services, IConfiguration configuration)
        //{
        //    services.AddHttpClient(Constants.ActivitiApiClientName, activiti =>
        //    {
        //        string uri = configuration["Activiti:Uri"];
        //        activiti.BaseAddress = new Uri(uri);
        //        activiti.DefaultRequestHeaders.Add("Accept", "application/json");
        //        activiti.DefaultRequestHeaders.Add("User-Agent", "HttpClientFactory");
        //    });
        //}

        private static void AddValidationRules(this IServiceCollection services)
        {
           //services.AddScoped<IBaseValidationRules<UtilityViewModel>, UtilityValidationService>();
           //services.AddScoped<IBaseValidationRules<HotelViewModel>, HotelValidationService>();
        }

        private static void AddValidationServices(this IServiceCollection services)
        {
           services.AddScoped<IValidationService<UtilityViewModel, Utility, int>, UtilityValidationService>();
           services.AddScoped<IValidationService<HotelViewModel, Hotel, int>, HotelValidationService>();
           services.AddScoped<IValidationService <RoomTypeViewModel, RoomType, int>, RoomtypeValidationService>();

        }
        private static void AddBusinessServices(this IServiceCollection services)
        {
            services.AddScoped<IUtilityServices, UtilityService>();
            services.AddScoped<IHotelServices, HotelService>();
            services.AddScoped<IRoomTypeServices,RoomtypeService>();
        }

        private static void AddCustomRepositories(this IServiceCollection services)
        {
           services.AddScoped<IHotelUtilityGroupRepository, HotelUtilityGroupRepository>();
            //services.AddScoped<IQuyTrinhRepository, QuyTrinhRepository>();
            //services.AddScoped<IHoSoRepository, HoSoRepository>();
            //services.AddScoped<ICauHinhBuocRepository, CauHinhBuocRepository>();
            //services.AddScoped<ICadasEnterpriseService, CadasEnterpriseService>();
            //services.AddScoped<IHoSoDangKyRepository, HoSoDangKyRepository>();
            //services.AddScoped<IBuocXuLyRepository, BuocXuLyRepository>();
            //services.AddScoped<IDvhcRepository, DvhcRepository>();
        }




    }
}

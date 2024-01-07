using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;
using Hangfire;
using Application.Extensions;
using Common;
using Infrastructure;
using Microsoft.Extensions.Hosting;
using Infrastructure.EF;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Middlewares;


namespace Web
{
    public class Startup
    {
        // Order to run
        //1) Constructor
        //2) Configure services
        //3) Configure
        private IWebHostEnvironment HostingEnvironment { get; }
        public static IConfiguration Configuration { get; set; }

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            HostingEnvironment = env;
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            services.AddDbContext<DBBOOKINGHOTELContext>(options =>
             options.UseSqlServer("Server=DESKTOP-9I2VLVA\\SQLEXPRESS;Database=DBBOOKINGHOTEL;User ID=robotics;Password=1234$"));
            services.AddApplication()
                .AddInfrastructure(Configuration, HostingEnvironment)
                .AddHealthChecks()
                .AddDbContextCheck<DBBOOKINGHOTELContext>();
            //services.AddHangfire(configuration => configuration
            //    .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
            //    .UseSimpleAssemblyNameTypeSerializer()
            //    .UseRecommendedSerializerSettings());

            //// Add the processing server as IHostedService
            //services.AddHangfireServer();

        }
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory, IWebHostEnvironment env)
        {
            var forwarOptions = new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            };
            forwarOptions.KnownNetworks.Clear();
            forwarOptions.KnownProxies.Clear();

            app.UseForwardedHeaders(forwarOptions);
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseOpenApi();
                app.UseSwaggerUi3();
            //app.UseSwaggerUi3(settings =>
            //{
            //    settings.Path = "/swagger";
            //    settings.DocumentPath = "/api/specification.json";
            //});
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors(Constants.DefaultCorsPolicy);
            app.UseAuthentication();
            app.UseCustomExceptionHandler();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                                   name: "default",
                                   pattern: "{controller}/{action=Index}/{id?}");

            });


        }
    }
}

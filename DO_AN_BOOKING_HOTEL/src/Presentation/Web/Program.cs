using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Application.Extensions;

// using Application.Features.System.Commands.SeedWebData;

[assembly: ApiConventionType(typeof(DefaultApiConventions))]

namespace Web
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();
            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
                  WebHost.CreateDefaultBuilder(args)
                        .ConfigureAppConfiguration((host, configuration) => configuration.AddCustomAppSettings(host.HostingEnvironment.ContentRootPath, host.HostingEnvironment.EnvironmentName))
                        .UseStartup<Startup>();
    }
}

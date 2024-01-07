using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EF
{
    public class DbBOOKINGHOTELContextFactory : IDesignTimeDbContextFactory<DBBOOKINGHOTELContext>
    {
        public DBBOOKINGHOTELContext CreateDbContext(string[] args)
        {
            string path = AppDomain.CurrentDomain.BaseDirectory;
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json").Build();
            var connectionString = configuration.GetConnectionString("BookingHotelDB");
            var optionsBuilder = new DbContextOptionsBuilder<DBBOOKINGHOTELContext>();
            optionsBuilder.UseSqlServer("Server=DESKTOP-9I2VLVA\\SQLEXPRESS;Database=DBBOOKINGHOTEL;User ID=robotics;Password=1234$");

            return new DBBOOKINGHOTELContext(optionsBuilder.Options);
        }
    }
}

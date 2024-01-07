using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Application.Abstractions;
using Infrastructure.EF.Configurations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNet.Identity.EntityFramework;

namespace Infrastructure.EF
{
    public class DBBOOKINGHOTELContext : IdentityDbContext<AppUser,AppRole,Guid>, IDBBOOKINGHOTELContext
    {
        public DBBOOKINGHOTELContext(DbContextOptions<DBBOOKINGHOTELContext> options)
           : base(options)
        {
        }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<ImageHotelRoom> ImageHotelRooms { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomBooking> RoomBookings { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }
        public DbSet<RoomUtility> RoomUtilities { get; set; }
        public DbSet<UserClient> UserClients { get; set; }
        public DbSet<Utility> Utilities { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-9I2VLVA\\SQLEXPRESS;Initial Catalog=DBBOOKINGHOTEL;User ID=robotics;Password=1234$");

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new BookingConfiguration());
            modelBuilder.ApplyConfiguration(new HotelConfiguration());
            modelBuilder.ApplyConfiguration(new ImageConfiguration());
            modelBuilder.ApplyConfiguration(new ImageHotelRoomConfiguration());
            modelBuilder.ApplyConfiguration(new RoomConfiguration());
            modelBuilder.ApplyConfiguration(new RoomBookingConfiguration());
            modelBuilder.ApplyConfiguration(new RoomTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoomUtilityConfiguration());
            modelBuilder.ApplyConfiguration(new UserClientConfiguration());
            modelBuilder.ApplyConfiguration(new UtilityConfiguration());

            modelBuilder.ApplyConfiguration(new AppRoleConfiguration());
            modelBuilder.ApplyConfiguration(new AppUserConfiguration());

            modelBuilder.Entity<IdentityUserClaim<Guid>>().ToTable("UserClaim");
            modelBuilder.Entity<IdentityUserRole<Guid>>().ToTable("UserRole").HasKey(x => new { x.UserId, x.RoleId});
            modelBuilder.Entity<IdentityUserLogin<Guid>>().ToTable("UserLogin").HasKey(x => x.UserId);
            modelBuilder.Entity<IdentityRoleClaim<Guid>>().ToTable("RoleClaim");
            modelBuilder.Entity<IdentityUserToken<Guid>>().ToTable("UserToken").HasKey(x => x.UserId);
            //base.OnModelCreating(modelBuilder);
        }

        
    }
}

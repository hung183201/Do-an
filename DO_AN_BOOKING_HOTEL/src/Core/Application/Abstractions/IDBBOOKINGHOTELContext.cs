using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Abstractions
{
    public interface IDBBOOKINGHOTELContext
    {
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
        public DbSet<HotelUtility> HotelUtilities { get; set; }
        public DbSet<Servicess> Services { get; set; }
        public DbSet<BooKingServices> BooKingServices { get; set; }


        Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken());
        int SaveChanges();
    }
}

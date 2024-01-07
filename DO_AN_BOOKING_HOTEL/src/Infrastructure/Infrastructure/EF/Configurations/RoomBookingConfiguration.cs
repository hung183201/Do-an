using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EF.Configurations
{
    public class RoomBookingConfiguration : BaseEntityTypeConfiguration<RoomBooking, int>
    {
        public override void Configure(EntityTypeBuilder<RoomBooking> builder)
        {

            builder.ToTable("ROOM_BOOKING");

            builder.Property(e => e.IdBooking).HasColumnName("ID_BOOKING");

            builder.Property(e => e.IdRoomType).HasColumnName("ID_ROOM_TYPE");

            builder.Property(e => e.Price)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("PRICE");

            builder.HasOne(d => d.IdBookingNavigation)
                .WithMany(p => p.RoomBookings)
                .HasForeignKey(d => d.IdBooking)
                .HasConstraintName("FK_ROOM_BOOKING_BOOKING");

            builder.HasOne(d => d.IdRoomTypeNavigation)
                .WithMany(p => p.RoomBookings)
                .HasForeignKey(d => d.IdRoomType)
                .HasConstraintName("FK_ROOM_BOOKING_ROOM");
        }
    }
}

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
    public class ImageHotelRoomConfiguration : BaseEntityTypeConfiguration<ImageHotelRoom, int>
    {
        public override void Configure(EntityTypeBuilder<ImageHotelRoom> builder)
        {
            builder.ToTable("IMAGE_HOTEL_ROOM");

            builder.Property(e => e.IdHotelOrRoom).HasColumnName("ID_HOTEL_OR_ROOM");

            builder.Property(e => e.IdImage).HasColumnName("ID_IMAGE");

            builder.HasOne(d => d.IdHotelOrRoomNavigation)
                .WithMany(p => p.ImageHotelRooms)
                .HasForeignKey(d => d.IdHotelOrRoom)
                .HasConstraintName("FK_IMAGE_HOTEL_ROOM_HOTEL");

            builder.HasOne(d => d.IdImageNavigation)
                .WithMany(p => p.ImageHotelRooms)
                .HasForeignKey(d => d.IdImage)
                .HasConstraintName("FK_IMAGE_HOTEL_ROOM_IMAGES");
        }
    }
}

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
    public class RoomTypeConfiguration : BaseEntityTypeConfiguration<RoomType, int>
    {
        public override void Configure(EntityTypeBuilder<RoomType> builder)
        {

            builder.ToTable("ROOM_TYPES");

            builder.Property(e => e.ExtraBed)
                .HasMaxLength(10)
                .HasColumnName("EXTRA_BED")
                .IsFixedLength(true);

            builder.Property(e => e.IdHotel).HasColumnName("ID_HOTEL");


            builder.Property(e => e.MaxPeople).HasColumnName("MAX_PEOPLE");

            builder.Property(e => e.NameRoomType)
                .HasMaxLength(10)
                .HasColumnName("NAME_ROOM_TYPE")
                .IsFixedLength(true);

            builder.Property(e => e.Price)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("PRICE");

            builder.Property(e => e.Size)
                .HasMaxLength(10)
                .HasColumnName("SIZE")
                .IsFixedLength(true);

            builder.Property(e => e.TotalBed).HasColumnName("TOTAL_BED");

            builder.Property(e => e.TotalRoom).HasColumnName("TOTAL_ROOM");



            builder.HasOne(d => d.IdHotelNavigation)
                .WithMany(p => p.RoomTypes)
                .HasForeignKey(d => d.IdHotel)
                .HasConstraintName("FK_ROOM_TYPES_HOTEL");

            builder.HasOne(d => d.IdRoomTypeNavigation)
                .WithOne(p => p.RoomType)
                .HasForeignKey<RoomType>(d => d.Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ROOM_TYPES_IMAGE_HOTEL_ROOM");
        }
    }
}

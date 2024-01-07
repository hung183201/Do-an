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
    public class RoomConfiguration : BaseEntityTypeConfiguration<Room, int>
    {
        public override void Configure(EntityTypeBuilder<Room> builder)
        {

            builder.ToTable("ROOM");

            builder.Property(e => e.IdRoomType).HasColumnName("ID_ROOM_TYPE");

            builder.Property(e => e.Image)
                .HasMaxLength(255)
                .HasColumnName("IMAGE");


            builder.Property(e => e.Status).HasColumnName("STATUS");

            builder.HasOne(d => d.IdRoomTypeNavigation)
                .WithMany(p => p.Rooms)
                .HasForeignKey(d => d.IdRoomType)
                .HasConstraintName("FK_ROOM_ROOM_TYPES");
        }
    }
}

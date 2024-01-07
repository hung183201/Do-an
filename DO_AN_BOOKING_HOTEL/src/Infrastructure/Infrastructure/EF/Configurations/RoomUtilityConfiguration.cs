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
    public class RoomUtilityConfiguration : BaseEntityTypeConfiguration<RoomUtility, int>
    {
        public override void Configure(EntityTypeBuilder<RoomUtility> builder)
        {

            builder.ToTable("ROOM_UTILITIES");

            builder.Property(e => e.IdRoomTypes).HasColumnName("ID_ROOM_TYPES");

            builder.Property(e => e.IdUtilities).HasColumnName("ID_UTILITIES");

            builder.HasOne(d => d.IdRoomTypesNavigation)
                .WithMany(p => p.RoomUtilities)
                .HasForeignKey(d => d.IdRoomTypes)
                .HasConstraintName("FK_ROOM_UTILITIES_ROOM_TYPES");

            builder.HasOne(d => d.IdUtilitiesNavigation)
                .WithMany(p => p.RoomUtilities)
                .HasForeignKey(d => d.IdUtilities)
                .HasConstraintName("FK_ROOM_UTILITIES_UTILITIES");
        }
    }
}

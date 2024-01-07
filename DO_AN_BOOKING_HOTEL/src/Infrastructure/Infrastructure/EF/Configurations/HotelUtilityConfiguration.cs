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
    public class HotelUtilityConfiguration : BaseEntityTypeConfiguration<HotelUtility, int>
    {
        public override void Configure(EntityTypeBuilder<HotelUtility> builder)
        {
            builder.ToTable("HOTEL_UTILITIES");

            builder.Property(e => e.IdHotels).HasColumnName("ID_HOTEL");

            builder.Property(e => e.IdUtilities).HasColumnName("ID_UTILITIES");

            builder.HasOne(d => d.IdHotelsNavigation)
                .WithMany(p => p.HotelUtilities)
                .HasForeignKey(d => d.IdHotels)
                .HasConstraintName("FK_ROOM_UTILITIES_HOTEL");

            builder.HasOne(d => d.IdUtilitiesNavigation)
                .WithMany(p => p.HotelUtilities)
                .HasForeignKey(d => d.IdUtilities)
                .HasConstraintName("FK_HOTEL_UTILITIES_UTILITIES");
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EF.Configurations
{
    public class BooKingServicesConfiguration : BaseEntityTypeConfiguration<BooKingServices, int>
    {
        public override void Configure(EntityTypeBuilder<BooKingServices> builder)
        {
            builder.ToTable("BOOKING_SERVICES");

            builder.Property(e => e.IdBooking).HasColumnName("ID_BOOKING");

            builder.Property(e => e.IdServices).HasColumnName("ID_SERVICES");

            builder.HasOne(d => d.IdBookingNavigation)
                .WithMany(p => p.BooKingServices)
                .HasForeignKey(d => d.IdBooking)
                .HasConstraintName("FK_BOOKING_BooKingServices");

            builder.HasOne(d => d.IdServicesNavigation)
                .WithMany(p => p.BooKingServices)
                .HasForeignKey(d => d.IdServices)
                .HasConstraintName("FK_BooKingServices_Services");
        }
    }
}

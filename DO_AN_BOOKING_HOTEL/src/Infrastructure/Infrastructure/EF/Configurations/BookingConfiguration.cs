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
    public class BookingConfiguration : BaseEntityTypeConfiguration<Booking, int>
    {
        public override void Configure(EntityTypeBuilder<Booking> builder)
        {

            builder.ToTable("BOOKING");
            
            builder.Property(e => e.CheckIn)
                .HasColumnType("datetime")
                .HasColumnName("CHECK_IN");
            
            builder.Property(e => e.CheckOut)
                .HasMaxLength(10)
                .HasColumnName("CHECK_OUT")
                .IsFixedLength(true);
            
            builder.Property(e => e.IdUser).HasColumnName("ID_USER");

            builder.Property(e => e.Note).HasColumnName("NOTE");

            builder.Property(e => e.TotalPrice)
                .HasColumnType("decimal(18, 0)")
                .HasColumnName("TOTAL_PRICE");

            builder.HasOne(x => x.AppUser).WithMany(x => x.Bookings).HasForeignKey(x => x.UserId);
            builder.HasOne(d => d.IdUserNavigation)
                .WithMany(p => p.Bookings)
                .HasForeignKey(d => d.IdUser)
                .HasConstraintName("FK_BOOKING_USER_CLIENT");
        }
    }
}

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
    public class HotelConfiguration : BaseEntityTypeConfiguration<Hotel, int>
    {
        public override void Configure(EntityTypeBuilder<Hotel> builder)
        {

            builder.ToTable("HOTEL");


            builder.Property(e => e.Address).HasColumnName("ADDRESS");

            builder.Property(e => e.CategoryHotel).HasColumnName("CATEGORY_HOTEL");

            builder.Property(e => e.NameHotel)
                .HasMaxLength(255)
                .HasColumnName("NAME_HOTEL");

            builder.Property(e => e.Note).HasColumnName("NOTE");
        }
    }
}

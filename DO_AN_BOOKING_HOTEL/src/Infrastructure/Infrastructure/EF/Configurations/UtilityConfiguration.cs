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
    public class UtilityConfiguration : BaseEntityTypeConfiguration<Utility, int>
    {
        public override void Configure(EntityTypeBuilder<Utility> builder)
        {

            builder.ToTable("UTILITIES");

            builder.Property(e => e.Icon)
                .HasMaxLength(500)
                .HasColumnName("ICON");

            builder.Property(e => e.NameUtilities).HasColumnName("NAME_UTILITIES");

            builder.Property(e => e.UtilitiesType).HasColumnName("UTILITIES_TYPE");
        }
    }
}

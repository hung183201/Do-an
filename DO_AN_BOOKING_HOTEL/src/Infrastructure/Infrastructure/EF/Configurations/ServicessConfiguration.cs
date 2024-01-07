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
    public class ServicessConfiguration : BaseEntityTypeConfiguration<Servicess, int>
    {
        public override void Configure(EntityTypeBuilder<Servicess> builder)
        {

            builder.ToTable("Services");
            builder.Property(e => e.NameService).HasColumnName("NAME_SERVICE");

            builder.Property(e => e.Price)
               .HasColumnType("decimal(18, 0)")
               .HasColumnName("PRICE");
        }
    }
}

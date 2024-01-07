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
    public class ImageConfiguration : BaseEntityTypeConfiguration<Image, int>
    {
        public override void Configure(EntityTypeBuilder<Image> builder)
        {
            builder.ToTable("IMAGES");

            builder.Property(e => e.ImageName).HasColumnName("IMAGE_NAME");

            builder.Property(e => e.Url).HasColumnName("URL");
        }
    }
}

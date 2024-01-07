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
    public class UserClientConfiguration : BaseEntityTypeConfiguration<UserClient, int>
    {
        public override void Configure(EntityTypeBuilder<UserClient> builder)
        {

            builder.ToTable("USER_CLIENT");

            builder.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("EMAIL");

            builder.Property(e => e.NameClient)
                .HasMaxLength(255)
                .HasColumnName("NAME_CLIENT");

            builder.Property(e => e.Password)
                .HasMaxLength(500)
                .HasColumnName("PASSWORD");

        }
    }
}

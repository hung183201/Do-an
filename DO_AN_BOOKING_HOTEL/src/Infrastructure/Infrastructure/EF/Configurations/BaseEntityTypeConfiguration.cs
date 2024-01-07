using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.EF.Configurations
{
    public abstract class BaseEntityTypeConfiguration<TBase, TId> : IEntityTypeConfiguration<TBase>
        where TBase : BaseEntity<TId>
    {
        public virtual void Configure(EntityTypeBuilder<TBase> entityTypeBuilder)
        {
            //Base Configuration
            entityTypeBuilder.Property(e => e.Id).HasColumnName("ID");
            if (typeof(TId) == typeof(string))
            {
                entityTypeBuilder.Property(e => e.Id).HasColumnType("CHAR(32)").ValueGeneratedNever();
            }
            if (typeof(TId) == typeof(int))
            {
                var fullName = typeof(TBase).FullName;
                if (fullName != null)
                    entityTypeBuilder.HasKey(k => k.Id);
            }
            entityTypeBuilder.Property(e => e.IdNguoiTao).HasColumnName("ID_NGUOI_TAO").HasColumnType("CHAR(32)");
            entityTypeBuilder.Property(e => e.IdNguoiCapNhat).HasColumnName("ID_NGUOI_CAP_NHAT").HasColumnType("CHAR(32)");
            entityTypeBuilder.Property(e => e.NgayTao).HasColumnName("NGAY_TAO").HasColumnType("DATE");
            entityTypeBuilder.Property(e => e.NguoiTao).HasColumnName("NGUOI_TAO").HasColumnType("NVARCHAR2(250)");
            entityTypeBuilder.Property(e => e.NgayCapNhat).HasColumnName("NGAY_CAP_NHAT").HasColumnType("DATE");
            entityTypeBuilder.Property(e => e.NguoiCapNhat).HasColumnName("NGUOI_CAP_NHAT").HasColumnType("NVARCHAR2(250)");
        }
    }
}

namespace Domain.Entities
{
    public class BaseEntity<TId> : AuditableEntity
    {
        public TId Id { get; set; }
    }

    public interface IHasTrangThai
    {
        public TrangThai Status { get; set; }
        public string StatusName => Common.ConvertTrangThai(Status);
    }
}

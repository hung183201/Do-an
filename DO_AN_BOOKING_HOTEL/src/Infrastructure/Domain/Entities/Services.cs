using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public partial class Servicess : BaseEntity<int>, IHasTrangThai
    {
        public string? NameService { get; set; }
        public decimal Price { get; set; }
        public TrangThai Status { get; set; }
        public string StatusName => Common.ConvertTrangThai(Status);
        public virtual ICollection<BooKingServices> BooKingServices { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;

namespace Domain.Entities
{
    public class Common
    {
        public static string ConvertTrangThai(TrangThai trangThai)
        {
            switch (trangThai)
            {
                case TrangThai.Active:
                    return "Hoạt động";
                case TrangThai.DeActive:
                    return "Không hoạt động";
                default:
                    throw new InvalidEnumArgumentException();
            }
        }
    }
}

using System;
using System.Globalization;

namespace Common.Extensions
{
    public static class DateTimeExtensions
    {
        public static DateTime StartOfWeek(this DateTime dt, DayOfWeek startOfWeek)
        {
            int diff = dt.DayOfWeek - startOfWeek;
            if (diff < 0)
            {
                diff += 7;
            }
            return dt.AddDays(-1 * diff).Date;
        }
        public static DateTime ConvertStringToDateTime(this DateTime dt, string date)
        {
            return DateTime.ParseExact(date, "dd/MM/yyyy", new CultureInfo("fr-FR"));
        }
    }
}

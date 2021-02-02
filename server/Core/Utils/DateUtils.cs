using System;
using System.Globalization;

namespace Visits.Core.Utils
{
    public static class DateUtils
    {
        public static bool ValidateDate(string value, string[] dateFormats)
        {
            DateTime tempDate = DateTime.Now;
            return DateTime.TryParseExact(value, dateFormats, DateTimeFormatInfo.InvariantInfo, DateTimeStyles.None, out tempDate);
        }
    }
}
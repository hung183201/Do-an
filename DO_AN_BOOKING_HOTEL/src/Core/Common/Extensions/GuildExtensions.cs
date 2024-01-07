using System;

namespace Common.Extensions
{
    public static class GuildExtensions
    {
        public static string ToStringEx(this Guid guid, bool isRecreateIfFirstNumber = false)
        {
            var newGuiId = guid.ToString("N").ToUpper();
            while (isRecreateIfFirstNumber && char.IsDigit(newGuiId[0]))
            {
                newGuiId = Guid.NewGuid().ToString("N").ToUpper();
            }

            return newGuiId;
        }
    }
}
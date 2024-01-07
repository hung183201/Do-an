using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Common
{
    public static class StringHelper
    {
        private static readonly Random Random = new Random();
        public static string RandomString(int length)
        {
            return RandomString(length, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
        }

        public static string RandomString(int length, string allowedChars)
        {
            return new string(Enumerable.Repeat(allowedChars, length)
                .Select(s => s[Random.Next(s.Length)]).ToArray());
        }

        public static string RandomAlphaBetString(int length)
        {
            return RandomString(length, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        }

        public static string RandomNumericString(int length)
        {
            return RandomString(1, "123456789") + RandomString(length - 1, "0123456789");
        }

        public static IEnumerable<string> RandomStrings(string allowedChars, int minLength, int maxLength, int count)
        {
            char[] chars = new char[maxLength];
            int setLength = allowedChars.Length;

            while (count-- > 0)
            {
                int length = Random.Next(minLength, maxLength + 1);

                for (int i = 0; i < length; ++i)
                {
                    chars[i] = allowedChars[Random.Next(setLength)];
                }

                yield return new string(chars, 0, length);
            }
        }

        public static string RandomString(int size, bool lowerCase = false)
        {
            var builder = new StringBuilder(size);

            // Unicode/ASCII Letters are divided into two blocks
            // (Letters 65–90 / 97–122):   
            // The first group containing the uppercase letters and
            // the second group containing the lowercase.  

            // char is a single Unicode character  
            char offset = lowerCase ? 'a' : 'A';
            const int lettersOffset = 26; // A...Z or a..z: length = 26  

            for (var i = 0; i < size; i++)
            {
                var @char = (char)Random.Next(offset, offset + lettersOffset);
                builder.Append(@char);
            }

            return lowerCase ? builder.ToString().ToLower() : builder.ToString();
        }

        public static string GetLast(this string source, int tailLength)
        {
            if (tailLength >= source.Length)
                return source;
            return source.Substring(source.Length - tailLength);
        }

        public static string ConvertUnicodeToASCII(string strUnicode)
        {
            try
            {
                Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
                string temp = strUnicode.Normalize(NormalizationForm.FormD);
                return regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D').Trim();
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }

    }
}
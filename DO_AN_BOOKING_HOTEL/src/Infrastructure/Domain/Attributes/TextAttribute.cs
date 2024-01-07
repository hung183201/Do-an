using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Common.Attributes
{
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property)]
    public class TextAttribute : Attribute
    {
        private readonly Type _resourceType;
        private readonly string _resourceName;
        private string _value;
        private string _code;

        public TextAttribute(Type resourceType, string resourceName)
        {
            _resourceType = resourceType;
            _resourceName = resourceName;
        }

        public TextAttribute(string value, string code = "")
        {
            _value = value;
            _code = code;
        }

        public string GetText()
        {
            if (_value == null)
            {
                var property = _resourceType.GetProperty(_resourceName, BindingFlags.Static | BindingFlags.Public);
                if (property == null)
                    throw new ArgumentException("Invalid resource: " + _resourceType + "." + _resourceName);
                _value = property.GetValue(null, null).ToString();
            }
            return _value;
        }

        public string GetCode()
        {
            if (_code == null)
            {
                return string.Empty;
            }
            return _code;
        }

        private static readonly IDictionary<Type, object> Cache = new ConcurrentDictionary<Type, object>();

        public static IEnumerable GetMemberText(Type enumType)
        {
            if (!Cache.ContainsKey(enumType))
            {
                // get the open generic method:
                var method =
                    typeof(TextAttribute).GetMethods(BindingFlags.Public | BindingFlags.Static)
                    .First(x => x.Name == "GetMemberText" && x.IsGenericMethod);
                // call the method with enumType
                method.MakeGenericMethod(enumType).Invoke(null, null);
            }
            return (IEnumerable)Cache[enumType];
        }
    }

    public interface IEnumMemberText
    {
        string Code { get; }
        string Text { get; }
        object GetValue();
    }
    public class EnumMemberText<TEnum> : IEnumMemberText
    {
        public string Text { get; internal set; }
        public int Id { get; internal set; }
        public string Code { get; internal set; }
        public TEnum Value { get; internal set; }

        public string Name { get; internal set; }
        object IEnumMemberText.GetValue()
        {
            return Value;
        }
    }
}

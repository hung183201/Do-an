using System.Collections.Generic;
using System.Linq;

namespace Common.Collections
{
    public static class CollectionHelper
    {
        public static void RemoveMultipleItems<T>(this IList<T> iList, IList<T> itemsToRemove)
        {
            var set = new HashSet<T>(itemsToRemove);

            var list = iList as List<T>;
            if (list == null)
            {
                int i = 0;
                while (i < iList.Count)
                {
                    if (set.Contains(iList[i])) iList.RemoveAt(i);
                    else i++;
                }
            }
            else
            {
                list.RemoveAll(set.Contains);
            }
        }

        public static void CreateNewOrUpdateExisting<TKey, TValue>(
            this IDictionary<TKey, TValue> map, TKey key, TValue value)
        {
            if (map.ContainsKey(key))
            {
                map[key] = value;
            }
            else
            {
                map.Add(key, value);
            }
        }

        public static TValue AddIfNotExists<TKey, TValue>(this IDictionary<TKey, TValue> dict, TKey key)
            where TValue : new()
        {
            TValue value;
            if (!dict.TryGetValue(key, out value))
            {
                value = new TValue();
                dict.Add(key, value);
            }
            return value;
        }

        public static void AddIfNotExists<T>(this ICollection<T> coll, T item)
        {
            if (!coll.Contains(item))
                coll.Add(item);
        }

        public static void AddIfNotExists<T>(this ICollection<T> coll, T[] listItems)
        {
            foreach (var item in listItems)
            {
                coll.AddIfNotExists(item);
            }
        }

        public static IEnumerable<IEnumerable<T>> SplitIntoSets<T>
            (this IEnumerable<T> source, int itemsPerSet)
        {
            var sourceList = source as List<T> ?? source.ToList();
            for (var index = 0; index < sourceList.Count; index += itemsPerSet)
            {
                yield return sourceList.Skip(index).Take(itemsPerSet);
            }
        }
    }
}

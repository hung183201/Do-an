using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace Common.Collections
{
    public static class ReadOnlyCollection
    {
        public static ICollection<T> GetReadOnlyWrapper<T>(this ICollection<T> collection)
        {
            return new CollectionReadOnlyWrapper<T>(collection);
        }

        public static ICollection<T> GetReadOnlyWrapper<T>(this ICollection<T> collection, ref ICollection<T> wrapper)
        {
            return wrapper == null || !((IWrapper)wrapper).IsWrapperOf(collection)
                       ? (wrapper = collection.GetReadOnlyWrapper())
                       : wrapper;
        }

        public static IList<T> GetReadOnlyWrapper<T>(this IList<T> list)
        {
            return new ListReadOnlyWrapper<T>(list);
        }

        public static IList<T> GetReadOnlyWrapper<T>(this IList<T> list, ref IList<T> wrapper)
        {
            return wrapper == null || !((IWrapper)wrapper).IsWrapperOf(list)
                       ? (wrapper = list.GetReadOnlyWrapper())
                       : wrapper;
        }

        public static IDictionary<TKey, TId> GetReadOnlyWrapper<TKey, TId>(this IDictionary<TKey, TId> dictionary)
        {
            return new ReadOnlyDictionaryWrapper<TKey, TId>(dictionary);
        }

        public static IDictionary<TKey, TId> GetReadOnlyWrapper<TKey, TId>(this IDictionary<TKey, TId> dictionary, ref IDictionary<TKey, TId> wrapper)
        {
            return wrapper == null || !((IWrapper)wrapper).IsWrapperOf(dictionary)
                       ? (wrapper = dictionary.GetReadOnlyWrapper())
                       : wrapper;
        }

        #region Wrapper classes

        internal interface IWrapper
        {
            bool IsWrapperOf(object target);
        }

        [DebuggerNonUserCode]
        internal class CollectionReadOnlyWrapper<T> : ICollection<T>, IWrapper
        {

            public bool IsWrapperOf(object target)
            {
                return ReferenceEquals(_wrapperTarget, target);
            }

            private readonly ICollection<T> _wrapperTarget;
            public CollectionReadOnlyWrapper(ICollection<T> target)
            {
                _wrapperTarget = target ?? new T[0];
            }

            public void Add(T item)
            {
                ChangeNotAllowed();
            }

            public void Clear()
            {
                ChangeNotAllowed();
            }

            public bool Contains(T item)
            {
                return _wrapperTarget.Contains(item);
            }

            public void CopyTo(T[] array, int arrayIndex)
            {
                _wrapperTarget.CopyTo(array, arrayIndex);
            }

            public int Count
            {
                get { return _wrapperTarget.Count; }
            }

            public bool IsReadOnly
            {
                get { return true; }
            }

            public bool Remove(T item)
            {
                ChangeNotAllowed();
                return false;
            }

            public IEnumerator<T> GetEnumerator()
            {
                return _wrapperTarget.GetEnumerator();
            }


            System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
            {
                return (_wrapperTarget as System.Collections.IEnumerable).GetEnumerator();
            }

        }
        [DebuggerNonUserCode]
        internal class ReadOnlyDictionaryWrapper<TKey, TValue> : IDictionary<TKey, TValue>, IWrapper
        {

            public bool IsWrapperOf(object target)
            {
                return ReferenceEquals(_wrapperTarget, target);
            }

            private readonly IDictionary<TKey, TValue> _wrapperTarget;
            public ReadOnlyDictionaryWrapper(IDictionary<TKey, TValue> wrapped)
            {
                _wrapperTarget = wrapped ?? new Dictionary<TKey, TValue>();
            }


            public void Add(TKey key, TValue value)
            {
                ChangeNotAllowed();
            }

            public bool ContainsKey(TKey key)
            {
                return _wrapperTarget.ContainsKey(key);
            }

            public ICollection<TKey> Keys
            {
                get { return _wrapperTarget.Keys; }
            }

            public bool Remove(TKey key)
            {
                ChangeNotAllowed();
                return false;
            }

            public bool TryGetValue(TKey key, out TValue value)
            {
                return _wrapperTarget.TryGetValue(key, out value);
            }

            public ICollection<TValue> Values
            {
                get { return _wrapperTarget.Values; }
            }

            public TValue this[TKey key]
            {
                get { return _wrapperTarget[key]; }
                set { ChangeNotAllowed(); }
            }


            public void Add(KeyValuePair<TKey, TValue> item)
            {
                ChangeNotAllowed();
            }

            public void Clear()
            {
                ChangeNotAllowed();
            }

            public bool Contains(KeyValuePair<TKey, TValue> item)
            {
                return _wrapperTarget.Contains(item);
            }

            public void CopyTo(KeyValuePair<TKey, TValue>[] array, int arrayIndex)
            {
                _wrapperTarget.CopyTo(array, arrayIndex);
            }

            public int Count
            {
                get { return _wrapperTarget.Count; }
            }

            public bool IsReadOnly
            {
                get { return true; }
            }

            public bool Remove(KeyValuePair<TKey, TValue> item)
            {
                ChangeNotAllowed();
                return false;
            }

            public IEnumerator<KeyValuePair<TKey, TValue>> GetEnumerator()
            {
                return _wrapperTarget.GetEnumerator();
            }

            System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
            {
                return (_wrapperTarget as System.Collections.IEnumerable).GetEnumerator();
            }
        }
        [DebuggerNonUserCode]
        internal class ListReadOnlyWrapper<T> : IList<T>, IWrapper
        {
            public bool IsWrapperOf(object target)
            {
                return ReferenceEquals(wrapperTarget, target);
            }

            private readonly IList<T> wrapperTarget;
            public ListReadOnlyWrapper(IList<T> target)
            {
                wrapperTarget = target ?? new List<T>();
            }

            public void Add(T item)
            {
                ChangeNotAllowed();
            }

            public void Clear()
            {
                ChangeNotAllowed();
            }

            public bool Contains(T item)
            {
                return wrapperTarget.Contains(item);
            }

            public void CopyTo(T[] array, int arrayIndex)
            {
                wrapperTarget.CopyTo(array, arrayIndex);
            }

            public int Count
            {
                get { return wrapperTarget.Count; }
            }

            public bool IsReadOnly
            {
                get { return true; }
            }

            public bool Remove(T item)
            {
                ChangeNotAllowed();
                return false;
            }

            public IEnumerator<T> GetEnumerator()
            {
                return wrapperTarget.GetEnumerator();
            }


            System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
            {
                return (wrapperTarget as System.Collections.IEnumerable).GetEnumerator();
            }

            public int IndexOf(T item)
            {
                return wrapperTarget.IndexOf(item);
            }

            public void Insert(int index, T item)
            {
                ChangeNotAllowed();
            }

            public void RemoveAt(int index)
            {
                ChangeNotAllowed();
            }

            public T this[int index]
            {
                get { return wrapperTarget[index]; }
                set { ChangeNotAllowed(); }
            }
        }
        #endregion

        public static void ChangeNotAllowed()
        {
            throw new InvalidOperationException("The collection is readonly");
        }

    }
}

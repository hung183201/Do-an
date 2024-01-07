using AutoMapper;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Abstractions.Repository
{
    public interface IReadOnlyRepository<TEntity> where TEntity : class
    {
        #region Find
        TEntity Find(params object[] keyValues);

        /// <summary>
        /// Finds an entity with the given primary key values. If found, is attached to the context and returned. If no entity is found, then null is returned.
        /// </summary>
        /// <param name="keyValues">The values of the primary key for the entity to be found.</param>
        /// <param name="cancellationToken">A <see cref="CancellationToken"/> to observe while waiting for the task to complete.</param>
        /// <returns>A <see cref="Task{TEntity}"/> that represents the asynchronous find operation. The task result contains the found entity or null.</returns>
        ValueTask<TEntity> FindAsync(object[] keyValues, CancellationToken cancellationToken);

        ValueTask<TEntity> FindAsync(object[] keyValues);
        /// <summary>
        /// Find object by id
        /// throw exception if entity not found
        /// </summary>
        /// <param name="keyValues"></param>
        /// <returns></returns>
        TEntity FindEx(params object[] keyValues);
        ValueTask<TEntity> FindExAsync(object[] keyValues);
        ValueTask<TEntity> FindExAsync(object[] keyValues, CancellationToken cancellationToken);

        #endregion
        IQueryable<TEntity> GetQueryable(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false);

        IEnumerable<TEntity> Where(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            int rowModify = 0,
            bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false);

        IEnumerable<TResult> Where<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            int rowModify = 0,
            bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false);

        IEnumerable<TResult> Where<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null,
            int rowModify = 0,
            bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false);

        Task<IEnumerable<TEntity>> WhereAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            int rowModify = 0,
            bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false);

        Task<IEnumerable<TResult>> WhereAsync<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            IMapper mapper = null,
            int rowModify = 0,
            bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false);

        IPagedList<TEntity> ToPagedList(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            int pageIndex = 1,
            int pageSize = 20,
            int rowModify = 0,
            bool disableTracking = true, bool disableActiveFilter = false);

        IPagedList<TResult> ToPagedList<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            int pageIndex = 1,
            int pageSize = 20,
            int rowModify = 0,
            bool disableTracking = true, bool disableActiveFilter = false);

        IPagedList<TResult> ToPagedList<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null,
            int pageIndex = 1,
            int pageSize = 20,
            int rowModify = 0,
            bool disableTracking = true, bool disableActiveFilter = false);

        Task<IPagedList<TEntity>> ToPagedListAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            int pageIndex = 1,
            int pageSize = 20,
            int rowModify = 0,
            bool disableTracking = true, bool disableActiveFilter = false);
        Task<IPagedList<TResult>> ToPagedListAsync<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            int pageIndex = 1,
            int pageSize = 20,
            int rowModify = 0,
            bool disableTracking = true, bool disableActiveFilter = false);

        Task<IPagedList<TResult>> ToPagedListAsync<TResult>(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null, int pageIndex = 1,
            int pageSize = 20, int rowModify = 0, bool disableTracking = true, bool disableActiveFilter = false);

        TEntity Single(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        TResult Single<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        TResult Single<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        Task<TEntity> SingleAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        Task<TResult> SingleAsync<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        Task<TResult> SingleAsync<TResult>(
           Expression<Func<TEntity, bool>> filter = null,
           Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
           IMapper mapper = null,
           bool disableTracking = true, bool disableActiveFilter = false);

        TEntity SingleOrDefault(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        TResult SingleOrDefault<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        TResult SingleOrDefault<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        Task<TEntity> SingleOrDefaultAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        Task<TResult> SingleOrDefaultAsync<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        Task<TResult> SingleOrDefaultAsync<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        TEntity First(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        TResult First<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        TResult First<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        Task<TEntity> FirstAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        Task<TResult> FirstAsync<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        Task<TResult> FirstAsync<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        TEntity FirstOrDefault(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        TResult FirstOrDefault<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        TResult FirstOrDefault<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        Task<TEntity> FirstOrDefaultAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false);

        Task<TResult> FirstOrDefaultAsync<TResult>(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null, bool disableTracking = true, bool disableActiveFilter = false);

        Task<TResult> FirstOrDefaultAsync<TResult>(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null, bool disableTracking = true, bool disableActiveFilter = false);

        int Count(Expression<Func<TEntity, bool>> filter = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        Task<int> CountAsync(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false);

        int Max(Func<TEntity, int> selector, Expression<Func<TEntity, bool>> filter = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        bool Any(Expression<Func<TEntity, bool>> filter = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        Task<bool> AnyAsync(Expression<Func<TEntity, bool>> filter = null,
            bool disableTracking = true, bool disableActiveFilter = false);

        /// <summary>
        /// Uses raw SQL queries to fetch the specified <typeparamref name="TEntity" /> data.
        /// </summary>
        /// <param name="sql">The raw SQL.</param>
        /// <param name="parameters">The parameters.</param>
        /// <returns>An <see cref="IQueryable{TEntity}" /> that contains elements that satisfy the condition specified by raw SQL.</returns>
        IQueryable<TEntity> FromSql(string sql, params object[] parameters);
    }
}

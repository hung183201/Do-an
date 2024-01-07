// Copyright (c) Arch team. All rights reserved.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Application.Abstractions;
using Application.Abstractions.Repository;
//using Application.Extensions;
//using Common.Extensions;
using Domain.Entities;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Common.Extensions;
using Application.Exceptions;
using Application.Extensions;

namespace Infrastructure.Repository
{
    /// <summary>
    /// Represents a default readonly generic repository implements the <see cref="IReadOnlyRepository{TEntity}"/> interface.
    /// </summary>
    /// <typeparam name="TEntity">The type of the entity.</typeparam>
    public class ReadOnlyRepository<TEntity> : IReadOnlyRepository<TEntity> where TEntity : class
    {
        protected readonly DbContext Context;
        protected readonly DbSet<TEntity> Entities;

        public ReadOnlyRepository(DbContext context)
        {
            //Context = context;
            //Entities = context.Set<TEntity>();
            Context = context ?? throw new ArgumentNullException(nameof(context));
            //QueryFilterManager.InitilizeGlobalFilter(Context);
            Entities = Context.Set<TEntity>();
        }
        public TEntity Find(params object[] keyValues)
        {
            return Entities.Find(keyValues);
        }
        public ValueTask<TEntity> FindAsync(object[] keyValues)
        {
            return Entities.FindAsync(keyValues);
        }


        public ValueTask<TEntity> FindAsync(object[] keyValues, CancellationToken cancellationToken)
        {
            return Entities.FindAsync(keyValues, cancellationToken);
        }

        public TEntity FindEx(params object[] keyValues)
        {
            var entity = Find(keyValues);

            if (entity == null)
                throw new Exception($"{keyValues} of {typeof(TEntity).Name} not found.");

            return entity;
        }

        public ValueTask<TEntity> FindExAsync(object[] keyValues)
        {
            var entity = FindAsync(keyValues);

            if (entity == null)
                throw new Exception($"{keyValues} of {typeof(TEntity).Name} not found.");

            return entity;
        }

        public ValueTask<TEntity> FindExAsync(object[] keyValues, CancellationToken cancellationToken)
        {
            var entity = FindAsync(keyValues, cancellationToken);

            if (entity == null)
                throw new Exception($"{keyValues} of {typeof(TEntity).Name} not found.");

            return entity;
        }

        public IQueryable<TEntity> GetQueryable(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false)
        {
            IQueryable<TEntity> query = Entities;
            if (disableTracking)
            {
                query = query.AsNoTracking();
            }

            if (ignoreQueryFilters)
            {
                query = query.IgnoreQueryFilters();
            }

            if (include != null)
            {
                query = include(query);
            }

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            if (!disableActiveFilter && typeof(IHasTrangThai).IsAssignableFrom(typeof(TEntity)))
            {
                Expression<Func<TEntity, bool>> activeFilter = x => ((IHasTrangThai)x).Status == TrangThai.Active;
                query = query.Where(activeFilter);
            }
            return query;
        }

        public IEnumerable<TEntity> Where(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            int rowModify = 0, bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false)
        {
            return GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter, ignoreQueryFilters);
        }

        public IEnumerable<TResult> Where<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            int rowModify = 0, bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter, ignoreQueryFilters);

            if (selector != null)
            {
                return query.Select(selector).ToList();

            }
            return GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter).Project().To<TResult>();
        }

        public IEnumerable<TResult> Where<TResult>(
           Expression<Func<TEntity, bool>> filter = null,
           Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
           Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
           IMapper mapper = null,
           int rowModify = 0, bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter, ignoreQueryFilters);

            if (mapper != null)
            {
                return query.ProjectTo<TResult>(mapper.ConfigurationProvider).ToList();
            }

            return GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter, ignoreQueryFilters).Project().To<TResult>();
        }

        public async Task<IEnumerable<TEntity>> WhereAsync(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            int rowModify = 0, bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false)
        {
            return await GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter, ignoreQueryFilters).ToListAsync();
        }

        public async Task<IEnumerable<TResult>> WhereAsync<TResult>(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            IMapper mapper = null,
            int rowModify = 0, bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter, ignoreQueryFilters);

            if (selector != null)
            {
                return await query.Select(selector).ToListAsync();
            }
            if (mapper != null)
            {
                return await query.ProjectTo<TResult>(mapper.ConfigurationProvider).ToListAsync();
            }
            return await GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter, ignoreQueryFilters).Project().To<TResult>().ToListAsync();
        }


        public IPagedList<TEntity> ToPagedList(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null, int pageIndex = 1,
            int pageSize = 20, int rowModify = 0, bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter);
            return query.ToPagedList(pageIndex, pageSize, rowModify);
        }

        public IPagedList<TResult> ToPagedList<TResult>(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null, int pageIndex = 1,
            int pageSize = 20, int rowModify = 0, bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter);

            if (selector != null)
            {
                return query.Select(selector).ToPagedList(pageIndex, pageSize, rowModify);

            }

            return query.Project().To<TResult>().ToPagedList(pageIndex, pageSize, rowModify);
        }

        public IPagedList<TResult> ToPagedList<TResult>(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null, int pageIndex = 1,
            int pageSize = 20, int rowModify = 0, bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter);

            if (mapper != null)
            {
                return query.ProjectTo<TResult>(mapper.ConfigurationProvider).ToPagedList(pageIndex, pageSize, rowModify);

            }

            return query.Project().To<TResult>().ToPagedList(pageIndex, pageSize, rowModify);
        }

        public async Task<IPagedList<TEntity>> ToPagedListAsync(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null, int pageIndex = 1,
            int pageSize = 20, int rowModify = 0, bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter);
            return await query.ToPagedListAsync(pageIndex, pageSize, rowModify);

        }

        public async Task<IPagedList<TResult>> ToPagedListAsync<TResult>(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null, int pageIndex = 1,
            int pageSize = 20, int rowModify = 0, bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter);

            if (selector != null)
            {
                return await query.Select(selector).ToPagedListAsync(pageIndex, pageSize, rowModify);

            }

            return await query.Project().To<TResult>().ToPagedListAsync(pageIndex, pageSize, rowModify);
        }

        public async Task<IPagedList<TResult>> ToPagedListAsync<TResult>(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null , int pageIndex = 1,
            int pageSize = 20, int rowModify = 0, bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter);

            if (mapper != null)
            {
                return await query.ProjectTo<TResult>(mapper.ConfigurationProvider).ToPagedListAsync(pageIndex, pageSize, rowModify);
            }

            return await query.Project().To<TResult>().ToPagedListAsync(pageIndex, pageSize, rowModify);
        }

        public TEntity Single(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null, bool disableTracking = true, bool disableActiveFilter = false)
        {
            return GetQueryable(filter, null, include).Single();
        }

        public TResult Single<TResult>(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, null, include, disableTracking, disableActiveFilter);

            if (selector != null)
            {
                return query.Select(selector).Single();

            }
            return query.Project().To<TResult>().Single();
        }

        public TResult Single<TResult>(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null,
            bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, null, include, disableTracking, disableActiveFilter);

            if (mapper != null)
            {
                return query.ProjectTo<TResult>(mapper.ConfigurationProvider).Single();
            }

            return query.Project().To<TResult>().Single();
        }

        public async Task<TEntity> SingleAsync(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null, bool disableTracking = true, bool disableActiveFilter = false)
        {
            return await GetQueryable(filter, null, include, disableTracking, disableActiveFilter).SingleAsync();
        }

        public async Task<TResult> SingleAsync<TResult>(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, null, include, disableTracking, disableActiveFilter);

            if (selector != null)
            {
                return await query.Select(selector).SingleAsync();

            }
            return await query.Project().To<TResult>().SingleAsync();
        }

        public async Task<TResult> SingleAsync<TResult>(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null,
            bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, null, include, disableTracking, disableActiveFilter);

            if (mapper != null)
            {
                return await query.ProjectTo<TResult>(mapper.ConfigurationProvider).SingleAsync();
            }

            return await query.Project().To<TResult>().SingleAsync();
        }

        public TEntity SingleOrDefault(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null, bool disableTracking = true, bool disableActiveFilter = false)
        {
            return GetQueryable(filter, null, include, disableTracking, disableActiveFilter).SingleOrDefault();
        }

        public TResult SingleOrDefault<TResult>(Expression<Func<TEntity, bool>> filter = null, 
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, null, include, disableTracking, disableActiveFilter);

            if (selector != null)
            {
                return query.Select(selector).SingleOrDefault();

            }
            return query.Project().To<TResult>().SingleOrDefault();
        }

        public TResult SingleOrDefault<TResult>(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null,
            bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, null, include, disableTracking, disableActiveFilter);

            if (mapper != null)
            {
                return query.ProjectTo<TResult>(mapper.ConfigurationProvider).SingleOrDefault();

            }
            return query.Project().To<TResult>().SingleOrDefault();
        }

        public async Task<TEntity> SingleOrDefaultAsync(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null, bool disableTracking = true, bool disableActiveFilter = false)
        {
            return await GetQueryable(filter, null, include, disableTracking, disableActiveFilter).SingleOrDefaultAsync();
        }

        public async Task<TResult> SingleOrDefaultAsync<TResult>(Expression<Func<TEntity, bool>> filter = null, 
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, null, include, disableTracking, disableActiveFilter);

            if (selector != null)
            {
                return await query.Select(selector).SingleOrDefaultAsync();

            }
            return await query.Project().To<TResult>().SingleOrDefaultAsync();
        }

        public async Task<TResult> SingleOrDefaultAsync<TResult>(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null,
            bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, null, include, disableTracking, disableActiveFilter);

            if (mapper != null)
            {
                return await query.ProjectTo<TResult>(mapper.ConfigurationProvider).SingleOrDefaultAsync();
            }

            return await query.Project().To<TResult>().SingleOrDefaultAsync();
        }

        public TEntity First(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null, bool disableTracking = true, bool disableActiveFilter = false)
        {
            return GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter).First();
        }

        public TResult First<TResult>(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter);

            if (selector != null)
            {
                return query.Select(selector).First();

            }
            return query.Project().To<TResult>().First();
        }

        public TResult First<TResult>(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null,
            bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter);

            if (mapper != null)
            {
                return query.ProjectTo<TResult>(mapper.ConfigurationProvider).First();
            }

            return query.Project().To<TResult>().First();
        }

        public async Task<TEntity> FirstAsync(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null, bool disableTracking = true, bool disableActiveFilter = false)
        {
            return await GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter).FirstAsync();
        }

        public async Task<TResult> FirstAsync<TResult>(Expression<Func<TEntity, bool>> filter = null, 
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter);

            if (selector != null)
            {
                return await query.Select(selector).FirstAsync();

            }
            return await query.Project().To<TResult>().FirstAsync();
        }

        public async Task<TResult> FirstAsync<TResult>(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null,
            bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter);

            if (mapper != null)
            {
                return await query.ProjectTo<TResult>(mapper.ConfigurationProvider).FirstAsync();
            }

            return await query.Project().To<TResult>().FirstAsync();
        }

        public TEntity FirstOrDefault(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null, bool disableTracking = true, bool disableActiveFilter = false)
        {
            return GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter).FirstOrDefault();
        }

        public TResult FirstOrDefault<TResult>(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Expression<Func<TEntity, TResult>> selector = null,
            bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter);

            if (selector != null)
            {
                return query.Select(selector).FirstOrDefault();

            }
            return query.Project().To<TResult>().FirstOrDefault();
        }

        public TResult FirstOrDefault<TResult>(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            IMapper mapper = null,
            bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter);

            if (mapper != null)
            {
                return query.ProjectTo<TResult>(mapper.ConfigurationProvider).FirstOrDefault();
            }

            return query.Project().To<TResult>().FirstOrDefault();
        }

        public async Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null, bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false)
        {
            return await GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter, ignoreQueryFilters).FirstOrDefaultAsync();
        }

        public async Task<TResult> FirstOrDefaultAsync<TResult>(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null, Expression<Func<TEntity, TResult>> selector = null, bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter);

            if (selector != null)
            {
                return await query.Select(selector).FirstOrDefaultAsync();

            }
            return await GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter).Project().To<TResult>().FirstOrDefaultAsync();
        }

        public async Task<TResult> FirstOrDefaultAsync<TResult>(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
           Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null, IMapper mapper = null, bool disableTracking = true, bool disableActiveFilter = false)
        {
            var query = GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter);

            if (mapper != null)
            {
                return await query.ProjectTo<TResult>(mapper.ConfigurationProvider).FirstOrDefaultAsync();
            }

            return await GetQueryable(filter, orderBy, include, disableTracking, disableActiveFilter).Project().To<TResult>().FirstOrDefaultAsync();
        }

        public int Count(Expression<Func<TEntity, bool>> filter = null, bool disableTracking = true, bool disableActiveFilter = false)
        {
            return GetQueryable(filter, disableTracking: disableTracking).Count();
        }

        public Task<int> CountAsync(Expression<Func<TEntity, bool>> filter = null, Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null, bool disableTracking = true, bool disableActiveFilter = false, bool ignoreQueryFilters = false)
        {
            return GetQueryable(filter, include: include, disableTracking: disableTracking, disableActiveFilter: disableActiveFilter, ignoreQueryFilters: ignoreQueryFilters).CountAsync();
        }

        public int Max(Func<TEntity, int> selector, Expression<Func<TEntity, bool>> filter = null, bool disableTracking = true, bool disableActiveFilter = false)
        {
            var queryable = GetQueryable(filter, disableTracking: disableTracking);
            if (!queryable.Any()) return -1;
            return queryable.Max(selector);
        }

        public bool Any(Expression<Func<TEntity, bool>> filter = null, bool disableTracking = true, bool disableActiveFilter = false)
        {
            return GetQueryable(filter, disableTracking: disableTracking).Any();
        }

        public async Task<bool> AnyAsync(Expression<Func<TEntity, bool>> filter = null, bool disableTracking = true, bool disableActiveFilter = false)
        {
            return await GetQueryable(filter, disableTracking: disableTracking).AnyAsync();
        }

        public IQueryable<TEntity> FromSql(string sql, params object[] parameters)
        {
            return Entities.FromSqlRaw(sql, parameters);
        }
    }
}

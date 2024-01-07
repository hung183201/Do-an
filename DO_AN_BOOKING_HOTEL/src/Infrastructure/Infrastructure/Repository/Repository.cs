using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Application.Abstractions.Repository;
using Domain.Entities;

namespace Infrastructure.Repository
{
    /// <summary>
    /// Represents a default generic repository implements the <see cref="IRepository{TEntity}"/> interface.
    /// </summary>
    /// <typeparam name="TEntity">The type of the entity.</typeparam>
    public class Repository<TEntity> : ReadOnlyRepository<TEntity>, IRepository<TEntity> where TEntity : class
    {
        protected readonly DbSet<TEntity> DbSet;
        public Repository(DbContext context) : base(context)
        {
            DbSet = context.Set<TEntity>();
        }

        public TEntity Add(TEntity entity, bool isSaveImmediately = false)
        {
            var savedEntity = Entities.Add(entity).Entity;
            if (isSaveImmediately)
            {
                Context.SaveChanges();
            }

            return savedEntity;
        }

        public ValueTask<EntityEntry<TEntity>> AddAsync(TEntity entity, CancellationToken cancellationToken = default(CancellationToken))
        {
            return DbSet.AddAsync(entity, cancellationToken);
        }

        public Task AddAsync(params TEntity[] entities) => DbSet.AddRangeAsync(entities);

        public Task AddAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default(CancellationToken)) => DbSet.AddRangeAsync(entities, cancellationToken);

        public void AddRange(IEnumerable<TEntity> entities, bool isSaveImmediately = false)
        {
            Entities.AddRange(entities);
            if (isSaveImmediately)
            {
                Context.SaveChanges();
            }
        }

        public TEntity Update(TEntity entity, bool isSaveImmediately = false)
        {
            DetachEntity(entity, "Id");
            var savedEntity = Entities.Update(entity).Entity;
            if (isSaveImmediately)
            {
                Context.SaveChanges();
            }
            return savedEntity;
        }

        public void DetachEntity(TEntity entity, string propertyName)
        {
            var dbEntity = Context.Find<TEntity>(GetProperty(entity, propertyName));
            if (dbEntity != null)
                Context.Entry(dbEntity).State = EntityState.Detached;
            Context.Entry(entity).State = EntityState.Modified;
        }


        public object GetProperty(TEntity entity, string propertyName)
        {
            Type type = entity.GetType();
            PropertyInfo propertyInfo = type.GetProperty(propertyName);
            object value = propertyInfo?.GetValue(entity);
            return value;
        }

        public void UpdateRange(IEnumerable<TEntity> entities, bool isSaveImmediately = false)
        {
            Entities.UpdateRange(entities);
            if (isSaveImmediately)
            {
                Context.SaveChanges();
            }
        }

        public void Remove(TEntity entity, bool isSaveImmediately = false)
        {
            Entities.Remove(entity);
            if (isSaveImmediately)
            {
                Context.SaveChanges();
            }
        }

        public void RemoveRange(IEnumerable<TEntity> entities, bool isSaveImmediately = false)
        {
            Entities.RemoveRange(entities);
            if (isSaveImmediately)
            {
                Context.SaveChanges();
            }
        }

        public void RemoveWhere(Expression<Func<TEntity, bool>> filter = null, bool isSaveImmediately = false)
        {
            var records = Where(filter, disableTracking: false, disableActiveFilter: true);

            foreach (TEntity record in records)
            {
                Entities.Remove(record);
            }
            if (isSaveImmediately)
            {
                Context.SaveChanges();
            }
        }

        public TDto ProcessTransaction<TDto, TParameter>(TParameter parameter, Func<TParameter, TDto> doInvoke)
        {
            using (var dbContextTransaction = Context.Database.BeginTransaction())
            {
                TDto returnedData;
                try
                {
                    returnedData = doInvoke(parameter);
                    dbContextTransaction.Commit();
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    throw;
                }
                return returnedData;
            }
        }
        private bool TrySetProperty(object obj, string property, object value)
        {
            var prop = obj.GetType().GetProperty(property, BindingFlags.Public | BindingFlags.Instance);
            if (prop != null && prop.CanWrite)
            {
                prop.SetValue(obj, value, null);
                return true;
            }
            return false;
        }
    }
}

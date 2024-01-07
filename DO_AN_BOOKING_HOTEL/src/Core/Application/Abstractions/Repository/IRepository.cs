using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Abstractions.Repository
{
    /// <summary>
    /// Defines the interfaces for generic repository.
    /// </summary>
    /// <typeparam name="TEntity">The type of the entity.</typeparam>
    public interface IRepository<TEntity> : IReadOnlyRepository<TEntity> where TEntity : class
    {
        TEntity Add(TEntity entity, bool isSaveImmediately = false);

        /// <summary>
        /// Inserts a new entity asynchronously.
        /// </summary>
        /// <param name="entity">The entity to insert.</param>
        /// <param name="cancellationToken">A <see cref="CancellationToken"/> to observe while waiting for the task to complete.</param>
        /// <returns>A <see cref="Task"/> that represents the asynchronous insert operation.</returns>
        ValueTask<EntityEntry<TEntity>> AddAsync(TEntity entity, CancellationToken cancellationToken = default(CancellationToken));

        /// <summary>
        /// Inserts a range of entities asynchronously.
        /// </summary>
        /// <param name="entities">The entities to insert.</param>
        /// <returns>A <see cref="Task"/> that represents the asynchronous insert operation.</returns>
        Task AddAsync(params TEntity[] entities);

        /// <summary>
        /// Inserts a range of entities asynchronously.
        /// </summary>
        /// <param name="entities">The entities to insert.</param>
        /// <param name="cancellationToken">A <see cref="CancellationToken"/> to observe while waiting for the task to complete.</param>
        /// <returns>A <see cref="Task"/> that represents the asynchronous insert operation.</returns>
        Task AddAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken = default(CancellationToken));
        void AddRange(IEnumerable<TEntity> entities, bool isSaveImmediately = false);

        TEntity Update(TEntity entity, bool isSaveImmediately = false);
        void UpdateRange(IEnumerable<TEntity> entities, bool isSaveImmediately = false);

        void Remove(TEntity entity, bool isSaveImmediately = false);
        void RemoveRange(IEnumerable<TEntity> entities, bool isSaveImmediately = false);
        void RemoveWhere(Expression<Func<TEntity, bool>> filter = null, bool isSaveImmediately = false);

        TDto ProcessTransaction<TDto, TParameter>(TParameter parameter, Func<TParameter, TDto> doInvoke);

       // void UpdateChildCollection<TParent, TId, TChild>(TParent parentItem, List<TChild> newChildItems, Func<TParent, IEnumerable<TChild>> selector, Func<TChild, TId> idSelector) where TChild : BaseEntity<TId>;
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Abstractions;
using Application.Models.Requests;

namespace Application.Abstractions.Services
{
    public interface IBaseService<TEntity, TEntityIdType, TViewModel, TRequest> where TRequest: PagingRequest
    {        
        /// <summary>
        /// Lấy dữ liệu phân trang
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<IPagedList<TEntity>> Search(TRequest request);

        /// <summary>
        /// Lấy toàn bộ dữ liệu
       /// </summary>
        Task<IList<TEntity>> GetAll();

        /// <summary>
        /// Lấy dữ liệu theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<TEntity> GetById(TEntityIdType id);

        /// <summary>
        /// Thêm
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        Task<TEntity> Add(TViewModel obj);

        /// <summary>
        /// Sửa
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        Task<TEntity> Edit(TViewModel obj);

        /// <summary>
        /// Xóa
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<bool> Delete(TEntityIdType id);
        
        
    }
}

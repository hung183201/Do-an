namespace Application.Abstractions.Services
{
    public interface IValidationService<TViewModel, TEntity, TIdType>
    {
        public void ValidateInputInformation(TViewModel entity);
        public void ValidateInserting(TViewModel entity);
        public void ValidateUpdating(TViewModel entity);
        public TEntity ValidateDeleting(TIdType id);

        public TEntity ValidateEntityNotFound(TIdType id);
    }
}

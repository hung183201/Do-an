using FluentValidation;
using FluentValidation.Results;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Models.Validator.Base
{
    public interface IBaseValidationRules<T>
    {
        /// <summary>
        /// Validates the specified instance.
        /// </summary>
        /// <param name="instance">The instance.</param>
        /// <returns></returns>
        ValidationResult Validate(T instance);

        /// <summary>
        /// Validates the asynchronous.
        /// </summary>
        /// <param name="instance">The instance.</param>
        /// <param name="cancellation">The cancellation.</param>
        /// <returns></returns>
        Task<ValidationResult> ValidateAsync(T instance, CancellationToken cancellation);

        /// <summary>
        /// Validates the specified context.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <returns></returns>
        ValidationResult Validate(ValidationContext<T> context);

        /// <summary>
        /// Validates the asynchronous.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="cancellation">The cancellation.</param>
        /// <returns></returns>
        Task<ValidationResult> ValidateAsync(ValidationContext<T> context, CancellationToken cancellation);
    }
}

using Application.CategoryCom.CategoryException;
using Application.Common;
using Application.Common.Interfaces.Repositories;
using Application.Users.Exceptions;
using Domain.Category;
using MediatR;

namespace Application.CategoryCom.Command;

public class DeleteCategoryCommand: IRequest<Result<Category, CategoryException.CategoryException>>
{
    public required Guid CategoryId { get; init; }
}

public class DeleteCategoryCommandHandler(ICategoryRepository categoryRepository)
    : IRequestHandler<DeleteCategoryCommand, Result<Category, CategoryException.CategoryException>>
{
    public async Task<Result<Category, CategoryException.CategoryException>> Handle(
        DeleteCategoryCommand request,
        CancellationToken cancellationToken)
    {
        var categoryId = new CategoryId(request.CategoryId);

        var existingCourse = await categoryRepository.GetById(categoryId, cancellationToken);

        return await existingCourse.Match<Task<Result<Category, CategoryException.CategoryException>>>(
            async u => await DeleteEntity(u, cancellationToken),
            () => Task.FromResult<Result<Category,CategoryException.CategoryException>>(new CategoryNotFoundException(categoryId)));
    }

    public async Task<Result<Category, CategoryException.CategoryException>> DeleteEntity(Category category, CancellationToken cancellationToken)
    {
        try
        {
            return await categoryRepository.Delete(category, cancellationToken);
        }
        catch (Exception exception)
        {
            return new CategoryUnknownException(category.Id, exception);
        }
    }
}
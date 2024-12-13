using Domain;
using Domain.Users;
using Optional;

namespace Application.Common.Interfaces.Repositories;

public interface IUserRepository
{
    Task<User> Add(User user, CancellationToken cancellationToken);
    Task<Option<User>> SearchByName(string firstname , CancellationToken cancellationToken);
    Task<User> Update(User user, CancellationToken cancellationToken);
    Task<User> Delete(User user, CancellationToken cancellationToken);
    Task<Option<User>> GetById(UserId id, CancellationToken cancellationToken);
    Task<Option<User>> GetByLoginAndPassword(string login, string password, CancellationToken cancellationToken);

    Task<Option<User>> GetByFirstNameAndLastName(
        string firstName,
        string lastName,
        CancellationToken cancellationToken);
}
using Application.Common.Interfaces.Queries;
using Application.Common.Interfaces.Repositories;
using Domain;
using Domain.Users;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Optional;

namespace Infrastructure.Persistance.Repositories;

public class UserRepository(ApplicationDbContext context) : IUserRepository, IUserQueries
{
    public async Task<Option<User>> GetByFirstNameAndLastName(
        string firstName,
        string lastName,
        CancellationToken cancellationToken)
    {
        var entity = await context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.FirstName == firstName && x.LastName == lastName, cancellationToken);

        return entity == null ? Option.None<User>() : Option.Some(entity);
    }

    public async Task<IReadOnlyList<User>> GetAll(CancellationToken cancellationToken)
    {
        return await context.Users
            .AsNoTracking()
            .ToListAsync(cancellationToken);
    }
    public async Task<Option<User>> GetByLoginAndPassword(string login, string password, CancellationToken cancellationToken)
    {
        var entity = await context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Login == login && x.Password == password, cancellationToken);
        return entity == null ? Option.None<User>() : Option.Some(entity);
    }

    public async Task<Option<User>> GetById(UserId id, CancellationToken cancellationToken)
    {
        var entity = await context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        return entity == null ? Option.None<User>() : Option.Some(entity);
    }
    
    public async Task<Option<User>> SearchByName(string firstName, CancellationToken cancellationToken)
    {
        var entity = await context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.FirstName == firstName, cancellationToken);

        return entity == null ? Option.None<User>() : Option.Some(entity);
    }
    public async Task<User> Add(User user, CancellationToken cancellationToken)
    {
        await context.Users.AddAsync(user, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return user;
    }

    public async Task<User> Update(User user, CancellationToken cancellationToken)
    {
        context.Users.Update(user);

        await context.SaveChangesAsync(cancellationToken);

        return user;
    }

    public async Task<User> Delete(User user, CancellationToken cancellationToken)
    {
        context.Users.Remove(user);

        await context.SaveChangesAsync(cancellationToken);

        return user;
    }
}
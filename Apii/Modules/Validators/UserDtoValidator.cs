using Apii.Dtos;
using FluentValidation;
namespace Apii.Modules.Validators;

public class UserDtoValidator : AbstractValidator<UserDto>
{
    public UserDtoValidator()
    {
        RuleFor(x => x.FirstName).NotEmpty().MaximumLength(255).MinimumLength(3);
        RuleFor(x => x.LastName).NotEmpty().MaximumLength(255).MinimumLength(3);
    }
}
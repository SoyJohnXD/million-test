namespace MillionProperty.Application.Features.Properties.Validators;

using FluentValidation;
using Queries;

public class GetFilteredPropertiesQueryValidator : AbstractValidator<GetFilteredPropertiesQuery>
{
    public GetFilteredPropertiesQueryValidator()
    {
        RuleFor(q => q.MinPrice)
            .LessThanOrEqualTo(q => q.MaxPrice)
            .When(q => q.MinPrice.HasValue && q.MaxPrice.HasValue)
            .WithMessage("Minimum price cannot be greater than maximum price.");

        RuleFor(q => q.Name)
            .MaximumLength(50)
            .WithMessage("Name filter cannot exceed 50 characters.");
    }
}
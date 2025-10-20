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

        RuleFor(q => q.Bedrooms)
            .GreaterThanOrEqualTo(0)
            .When(q => q.Bedrooms.HasValue)
            .WithMessage("Bedrooms filter cannot be negative.");

        RuleFor(q => q.Bathrooms)
            .GreaterThanOrEqualTo(0)
            .When(q => q.Bathrooms.HasValue)
            .WithMessage("Bathrooms filter cannot be negative.");

        RuleFor(q => q.MinYear)
            .LessThanOrEqualTo(DateTime.UtcNow.Year)
            .When(q => q.MinYear.HasValue)
            .WithMessage("Minimum year cannot be greater than current year.");

        RuleFor(q => q.MinSquareMeters)
            .GreaterThanOrEqualTo(0)
            .When(q => q.MinSquareMeters.HasValue)
            .WithMessage("Minimum square meters cannot be negative.");
    }
}
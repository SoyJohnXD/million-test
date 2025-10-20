using FluentValidation.TestHelper;
using MillionProperty.Application.Features.Properties.Queries;
using MillionProperty.Application.Features.Properties.Validators;
using NUnit.Framework;

namespace MillionProperty.Tests.Unit.Application.Validators;

[TestFixture]
public class GetFilteredPropertiesQueryValidatorTests
{
    private GetFilteredPropertiesQueryValidator _validator;

    [SetUp]
    public void Setup()
    {
        _validator = new GetFilteredPropertiesQueryValidator();
    }
    
    [Test]
    public void Handle_Should_HaveError_WhenMinPriceIsGreaterThanMaxPrice()
    {
       
        var query = new GetFilteredPropertiesQuery
        {
            MinPrice = 1000,
            MaxPrice = 500
        };

        var result = _validator.TestValidate(query);

       
      result.ShouldHaveValidationErrorFor(q => q.MinPrice)
          .WithErrorMessage("Minimum price cannot be greater than maximum price.");
              
        result.ShouldNotHaveValidationErrorFor(q => q.Name);
    }
    
    [Test]
    public void Handle_Should_NotHaveError_WhenQueryIsValid()
    {
       
        var query = new GetFilteredPropertiesQuery
        {
            Name = "Villa",
            MinPrice = 500,
            MaxPrice = 1000,
            PageNumber = 1,
            PageSize = 10
        };

        var result = _validator.TestValidate(query);

        result.ShouldNotHaveAnyValidationErrors();
    }
    
    [Test]
    public void Handle_Should_HaveError_WhenNameIsTooLong()
    {
        var longName = new string('a', 51); 
        var query = new GetFilteredPropertiesQuery { Name = longName };

        var result = _validator.TestValidate(query);

      result.ShouldHaveValidationErrorFor(q => q.Name)
          .WithErrorMessage("Name filter cannot exceed 50 characters.");
    }
    
    [Test]
    public void Handle_Should_HaveError_WhenBedroomsIsNegative()
    {
        var query = new GetFilteredPropertiesQuery { Bedrooms = -1 };

        var result = _validator.TestValidate(query);

      result.ShouldHaveValidationErrorFor(q => q.Bedrooms)
          .WithErrorMessage("Bedrooms filter cannot be negative.");
    }

    [Test]
    public void Handle_Should_HaveError_WhenBathroomsIsNegative()
    {
        var query = new GetFilteredPropertiesQuery { Bathrooms = -1 };

        var result = _validator.TestValidate(query);

      result.ShouldHaveValidationErrorFor(q => q.Bathrooms)
          .WithErrorMessage("Bathrooms filter cannot be negative.");
    }

    [Test]
    public void Handle_Should_HaveError_WhenMinYearIsGreaterThanCurrentYear()
    {
        var query = new GetFilteredPropertiesQuery
        {
            MinYear = DateTime.Now.Year + 1
        };

        var result = _validator.TestValidate(query);

      result.ShouldHaveValidationErrorFor(q => q.MinYear)
          .WithErrorMessage("Minimum year cannot be greater than current year.");
    }

    [Test]
    public void Handle_Should_HaveError_WhenMinSquareMetersIsNegative()
    {
        var query = new GetFilteredPropertiesQuery
        {
            MinSquareMeters = -1
        };

        var result = _validator.TestValidate(query);

      result.ShouldHaveValidationErrorFor(q => q.MinSquareMeters)
          .WithErrorMessage("Minimum square meters cannot be negative.");
    }
}
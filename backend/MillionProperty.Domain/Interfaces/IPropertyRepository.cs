using MillionProperty.Domain.Entities;
namespace MillionProperty.Domain.Interfaces;

public interface IPropertyRepository
{
    Task<(IEnumerable<Property> Properties, int TotalCount)> GetByFiltersAsync(
    string? name, 
    string? address, 
    decimal? minPrice, 
    decimal? maxPrice, 
    int pageNumber, 
    int pageSize);
    Task<Property?> GetByIdAsync(string id);
}
public interface IPropertyRepository
{
    Task<IEnumerable<Property>> GetByFiltersAsync(string name, string address, decimal? minPrice, decimal? maxPrice);
}
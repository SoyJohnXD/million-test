using MillionProperty.Domain.Entities;
namespace MillionProperty.Domain.Interfaces;

public interface IPropertyImageRepository
{
    Task<PropertyImage?> GetFirstEnabledImageByPropertyIdAsync(string idProperty);

    Task<IEnumerable<PropertyImage>> GetAllByPropertyIdAsync(string idProperty);
}
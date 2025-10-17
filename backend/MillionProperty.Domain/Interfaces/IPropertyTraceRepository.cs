namespace MillionProperty.Domain.Interfaces;

public interface IPropertyTraceRepository
{
    Task<IEnumerable<PropertyTrace>> GetByPropertyIdAsync(string idProperty);
}
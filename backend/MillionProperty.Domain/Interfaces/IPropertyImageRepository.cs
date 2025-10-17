public interface IPropertyImageRepository
{
    Task<PropertyImage?> GetFirstEnabledImageByPropertyIdAsync(string idProperty);
}
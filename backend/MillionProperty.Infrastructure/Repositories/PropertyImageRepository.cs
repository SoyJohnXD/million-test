public class PropertyImageRepository : IPropertyImageRepository
{
    private readonly IMongoCollection<PropertyImage> _propertyImagesCollection;

    public PropertyImageRepository(IOptions<MongoDbSettings> settings)
    {
        var mongoClient = new MongoClient(settings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(settings.Value.DatabaseName);
        _propertyImagesCollection = mongoDatabase.GetCollection<PropertyImage>("PropertyImages");
    }

    public async Task<PropertyImage?> GetFirstEnabledImageByPropertyIdAsync(string idProperty)
    {
        var filter = Builders<PropertyImage>.Filter.Eq(img => img.IdProperty, idProperty) &
                     Builders<PropertyImage>.Filter.Eq(img => img.Enabled, true);

        return await _propertyImagesCollection.Find(filter).FirstOrDefaultAsync();
    }
}
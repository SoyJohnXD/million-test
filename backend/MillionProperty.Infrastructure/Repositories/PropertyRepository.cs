namespace MillionProperty.Infrastructure.Repositories;

public class PropertyRepository : IPropertyRepository
{
    private readonly IMongoCollection<Property> _propertiesCollection;

    public PropertyRepository(IOptions<MongoDbSettings> settings)
    {
        var mongoClient = new MongoClient(settings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(settings.Value.DatabaseName);
        _propertiesCollection = mongoDatabase.GetCollection<Property>("Properties");
    }

   public async Task<IEnumerable<Property>> GetByFiltersAsync(string? name, string? address, decimal? minPrice, decimal? maxPrice)    {
        var filterBuilder = Builders<Property>.Filter;
        var filter = filterBuilder.Empty;

        if (!string.IsNullOrEmpty(name))
        {
            filter &= filterBuilder.Regex(p => p.Name, new MongoDB.Bson.BsonRegularExpression(name, "i"));
        }

        if (!string.IsNullOrEmpty(address))
        {
            filter &= filterBuilder.Regex(p => p.Address, new MongoDB.Bson.BsonRegularExpression(address, "i"));
        }

        if (minPrice.HasValue)
        {
            filter &= filterBuilder.Gte(p => p.Price, minPrice.Value);
        }

        if (maxPrice.HasValue)
        {
            filter &= filterBuilder.Lte(p => p.Price, maxPrice.Value);
        }

        return await _propertiesCollection.Find(filter).ToListAsync();
    }
}
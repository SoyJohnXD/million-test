namespace MillionProperty.Infrastructure.Repositories;

public class PropertyTraceRepository : IPropertyTraceRepository
{
    private readonly IMongoCollection<PropertyTrace> _tracesCollection;

    public PropertyTraceRepository(IOptions<MongoDbSettings> settings)
    {
        var mongoClient = new MongoClient(settings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(settings.Value.DatabaseName);
        _tracesCollection = mongoDatabase.GetCollection<PropertyTrace>("PropertyTraces");
    }

    public async Task<IEnumerable<PropertyTrace>> GetByPropertyIdAsync(string idProperty)
    {
        return await _tracesCollection.Find(t => t.IdProperty == idProperty).ToListAsync();
    }
}
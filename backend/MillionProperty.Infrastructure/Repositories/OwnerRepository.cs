namespace MillionProperty.Infrastructure.Repositories;

public class OwnerRepository : IOwnerRepository
{
    private readonly IMongoCollection<Owner> _ownersCollection;

    public OwnerRepository(IOptions<MongoDbSettings> settings)
    {
        var mongoClient = new MongoClient(settings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(settings.Value.DatabaseName);
        _ownersCollection = mongoDatabase.GetCollection<Owner>("Owners");
    }

    public async Task<IEnumerable<Owner>> GetByIdsAsync(IEnumerable<string> ownerIds)
    {
        var filter = Builders<Owner>.Filter.In(o => o.IdOwner, ownerIds);
        return await _ownersCollection.Find(filter).ToListAsync();
    }
    
    public async Task<Owner?> GetByIdAsync(string idOwner)
    {
        var filter = Builders<Owner>.Filter.Eq(o => o.IdOwner, idOwner);
        return await _ownersCollection.Find(filter).FirstOrDefaultAsync();
    }
}
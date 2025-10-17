namespace MillionProperty.Infrastructure.Data;

public static class MongoDbSeeder
{
    public static async Task SeedDataAsync(IMongoDatabase database)
    {
        var ownersCollection = database.GetCollection<Owner>("Owners");
        if (await ownersCollection.CountDocumentsAsync(FilterDefinition<Owner>.Empty) == 0)
        {
            var owners = new List<Owner>
            {
                new() { IdOwner = "652f1b0b3e7b4b7b3b7b3b7b", Name = "Alice Johnson", Address = "456 Oak Avenue", Birthday = new DateTime(1985, 5, 20), Photo = "https://i.pravatar.cc/150?u=alice" },
                new() { IdOwner = "652f1b0b3e7b4b7b3b7b3b7c", Name = "Robert Smith", Address = "789 Pine Street", Birthday = new DateTime(1978, 9, 15), Photo = "https://i.pravatar.cc/150?u=robert" }
            };
            await ownersCollection.InsertManyAsync(owners);
        }

        var propertiesCollection = database.GetCollection<Property>("Properties");
        if (await propertiesCollection.CountDocumentsAsync(FilterDefinition<Property>.Empty) == 0)
        {
            var properties = new List<Property>
            {
                new() { IdProperty = "652f1b0b3e7b4b7b3b7b3b7d", Name = "Modern Downtown Loft", Address = "101 Main Street, New York", Price = 1200000, CodeInternal = "NY001", Year = 2020, Description = "Stunning loft with panoramic city views.", Bedrooms = 2, Bathrooms = 2, SquareMeters = 150, IdOwner = "652f1b0b3e7b4b7b3b7b3b7b" },
                new() { IdProperty = "652f1b0b3e7b4b7b3b7b3b7e", Name = "Cozy Suburban House", Address = "202 Maple Drive, Chicago", Price = 750000, CodeInternal = "CH002", Year = 1995, Description = "Charming house with a large backyard, perfect for families.", Bedrooms = 4, Bathrooms = 3, SquareMeters = 250, IdOwner = "652f1b0b3e7b4b7b3b7b3b7c" }
            };
            await propertiesCollection.InsertManyAsync(properties);
        }

        var imagesCollection = database.GetCollection<PropertyImage>("PropertyImages");
        if (await imagesCollection.CountDocumentsAsync(FilterDefinition<PropertyImage>.Empty) == 0)
        {
            var images = new List<PropertyImage>
            {
                new() { IdPropertyImage = ObjectId.GenerateNewId().ToString(), Enabled = true, File = "https://picsum.photos/seed/loft/800/600", IdProperty = "652f1b0b3e7b4b7b3b7b3b7d" },
                new() { IdPropertyImage = ObjectId.GenerateNewId().ToString(), Enabled = true, File = "https://picsum.photos/seed/house/800/600", IdProperty = "652f1b0b3e7b4b7b3b7b3b7e" }
            };
            await imagesCollection.InsertManyAsync(images);
        }

    }
}
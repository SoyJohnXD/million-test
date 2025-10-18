namespace MillionProperty.Infrastructure.Data;

public static class MongoDbSeeder
{
    private static readonly Random _rand = new();

    private static readonly string[] _propertyTypes = { 
        "Lujoso Penthouse", "Moderno Apartamento", "Villa frente al mar", "Acogedora Casa de campo", 
        "Loft Industrial", "Chalet Suizo", "Bungalow en la playa", "Residencia Histórica" 
    };

    private static readonly string[] _cities = {
        "New York", "Paris", "Tokyo", "London", "Bogotá", "Sydney", "Berlin", 
        "Dubai", "Toronto", "Madrid", "Roma", "Buenos Aires", "Ciudad de México"
    };

    private static readonly string[] _streetNames = {
        "Main St", "Ocean Drive", "Rue de Rivoli", "King's Road", "Avenida Siempre Viva",
        "Shibuya Crossing", "Kurfürstendamm", "Calle 85"
    };

    private static readonly string[] _descriptions = {
        "Vistas impresionantes, acabados de lujo y ubicación céntrica. Una joya única.",
        "Perfecto para familias. Amplios jardines y una comunidad tranquila y segura.",
        "Diseño de vanguardia. Espacios abiertos, luz natural y tecnología de punta.",
        "Encanto rústico con todas las comodidades modernas. Escápate de la ciudad.",
        "El epítome del lujo. Servicios de conserjería 24/7 y piscina privada."
    };


    public static async Task SeedDataAsync(IMongoDatabase database)
    {
        var ownersCollection = database.GetCollection<Owner>("Owners");
        var propertiesCollection = database.GetCollection<Property>("Properties");
        var imagesCollection = database.GetCollection<PropertyImage>("PropertyImages");
        var tracesCollection = database.GetCollection<PropertyTrace>("PropertyTraces");

        List<string> ownerIds;
        if (await ownersCollection.CountDocumentsAsync(FilterDefinition<Owner>.Empty) == 0)
        {
            var owners = new List<Owner>
            {
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "Alice Johnson", Address = "456 Oak Avenue, New York", Birthday = new DateTime(1985, 5, 20), Photo = "https://i.pravatar.cc/150?u=alice" },
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "Robert Smith", Address = "789 Pine Street, London", Birthday = new DateTime(1978, 9, 15), Photo = "https://i.pravatar.cc/150?u=robert" },
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "Maria Garcia", Address = "123 Maple Rd, Madrid", Birthday = new DateTime(1990, 2, 10), Photo = "https://i.pravatar.cc/150?u=maria" },
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "Kenji Tanaka", Address = "456 Sakura Lane, Tokyo", Birthday = new DateTime(1982, 11, 30), Photo = "https://i.pravatar.cc/150?u=kenji" },
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "Fatima Al-Fassi", Address = "789 Desert Blvd, Dubai", Birthday = new DateTime(1995, 7, 22), Photo = "https://i.pravatar.cc/150?u=fatima" },
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "David Müller", Address = "101 Berliner Str, Berlin", Birthday = new DateTime(1975, 3, 14), Photo = "https://i.pravatar.cc/150?u=david" },
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "Chloé Dubois", Address = "202 Rue de la Paix, Paris", Birthday = new DateTime(1988, 12, 1), Photo = "https://i.pravatar.cc/150?u=chloe" },
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "Santiago Muñoz", Address = "303 Carrera 11, Bogotá", Birthday = new DateTime(1992, 8, 5), Photo = "https://i.pravatar.cc/150?u=santiago" },
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "Olivia Brown", Address = "404 Bondi Beach, Sydney", Birthday = new DateTime(1980, 6, 25), Photo = "https://i.pravatar.cc/150?u=olivia" },
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "Ahmed Khan", Address = "505 Palm Jumeirah, Dubai", Birthday = new DateTime(1983, 4, 18), Photo = "https://i.pravatar.cc/150?u=ahmed" }
            };
            
            await ownersCollection.InsertManyAsync(owners);
            ownerIds = owners.Select(o => o.IdOwner).ToList();
        }
        else
        {
            var existingOwners = await ownersCollection.Find(FilterDefinition<Owner>.Empty).ToListAsync();
            ownerIds = existingOwners.Select(o => o.IdOwner).ToList();
        }

        if (await propertiesCollection.CountDocumentsAsync(FilterDefinition<Property>.Empty) == 0)
        {
            var propertiesToSeed = new List<Property>();
            var imagesToSeed = new List<PropertyImage>();
            var tracesToSeed = new List<PropertyTrace>();

            for (int i = 0; i < 100; i++)
            {
                var propId = ObjectId.GenerateNewId().ToString();
                var city = _cities[_rand.Next(_cities.Length)];
                var type = _propertyTypes[_rand.Next(_propertyTypes.Length)];
                var street = _streetNames[_rand.Next(_streetNames.Length)];
                var year = _rand.Next(1980, 2024);
                var bedrooms = _rand.Next(1, 7);
                var bathrooms = _rand.Next(1, Math.Max(2, bedrooms)); 

                var property = new Property
                {
                    IdProperty = propId,
                    Name = $"{type} en {city}",
                    Address = $"{_rand.Next(1, 1000)} {street}, {city}",
                    Price = _rand.Next(200000, 8000000),
                    CodeInternal = $"{city.Substring(0, 2).ToUpper()}{i:000}",
                    Year = year,
                    Description = _descriptions[_rand.Next(_descriptions.Length)],
                    Bedrooms = bedrooms,
                    Bathrooms = bathrooms,
                    SquareMeters = _rand.Next(50, 800),
                    IdOwner = ownerIds[_rand.Next(ownerIds.Count)]
                };
                propertiesToSeed.Add(property);

                imagesToSeed.Add(new PropertyImage
                {
                    IdPropertyImage = ObjectId.GenerateNewId().ToString(),
                    Enabled = true,
                    File = $"https://picsum.photos/seed/{propId}/800/600",
                    IdProperty = propId
                });

                if (i % 3 == 0)
                {
                    imagesToSeed.Add(new PropertyImage
                    {
                        IdPropertyImage = ObjectId.GenerateNewId().ToString(),
                        Enabled = true,
                        File = $"https://picsum.photos/seed/{propId}_2/800/600",
                        IdProperty = propId
                    });
                }

                tracesToSeed.Add(new PropertyTrace
                {
                    IdPropertyTrace = ObjectId.GenerateNewId().ToString(),
                    DateSale = new DateTime(year, _rand.Next(1, 12), _rand.Next(1, 28)),
                    Name = "Venta Inicial",
                    Value = property.Price * (decimal)(0.7 + _rand.NextDouble() * 0.2),
                    Tax = property.Price * 0.05m,
                    IdProperty = propId
                });
            }

            await propertiesCollection.InsertManyAsync(propertiesToSeed);
            await imagesCollection.InsertManyAsync(imagesToSeed);
            await tracesCollection.InsertManyAsync(tracesToSeed);
        }
    }
}
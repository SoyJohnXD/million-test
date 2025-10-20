using MongoDB.Bson;
using MongoDB.Driver;
using MillionProperty.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MillionProperty.Infrastructure.Data;

public static class MongoDbSeeder
{
    private static readonly Random _rand = new();
    // Datos constantes extraídos a SeedDataConstants

    public static async Task SeedDataAsync(IMongoDatabase database)
    {
        var ownersCollection = database.GetCollection<Owner>("Owners");
        var propertiesCollection = database.GetCollection<Property>("Properties");
        var imagesCollection = database.GetCollection<PropertyImage>("PropertyImages");
        var tracesCollection = database.GetCollection<PropertyTrace>("PropertyTraces");

        var ownerIds = await EnsureOwnersAsync(ownersCollection);

        await EnsurePropertiesAsync(propertiesCollection, imagesCollection, tracesCollection, ownerIds);
    }

    private static async Task<List<string>> EnsureOwnersAsync(IMongoCollection<Owner> ownersCollection)
    {
        if (await ownersCollection.CountDocumentsAsync(FilterDefinition<Owner>.Empty) == 0)
        {
            var owners = new List<Owner>
            {
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "Alice Johnson", Address = "456 Oak Avenue, New York", Birthday = new DateTime(1985, 5, 20), Photo = "https://i.pravatar.cc/150?u=alice" },
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "Robert Smith", Address = "789 Pine Street, London", Birthday = new DateTime(1978, 9, 15), Photo = "https://i.pravatar.cc/150?u=robert" },
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "Maria Garcia", Address = "123 Maple Rd, Madrid", Birthday = new DateTime(1990, 2, 10), Photo = "https://i.pravatar.cc/150?u=maria" },
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "Kenji Tanaka", Address = "456 Sakura Lane, Tokyo", Birthday = new DateTime(1982, 11, 30), Photo = "https://i.pravatar.cc/150?u=kenji" },
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "Fatima Al-Fassi", Address = "789 Desert Blvd, Dubai", Birthday = new DateTime(1995, 7, 22), Photo = "https://i.pravatar.cc/150?u=fatima" }
            };

            await ownersCollection.InsertManyAsync(owners);
            return owners.Select(o => o.IdOwner).ToList();
        }

        return (await ownersCollection
                .Find(FilterDefinition<Owner>.Empty)
                .ToListAsync())
            .Select(o => o.IdOwner)
            .ToList();
    }

    private static async Task EnsurePropertiesAsync(
        IMongoCollection<Property> propertiesCollection,
        IMongoCollection<PropertyImage> imagesCollection,
        IMongoCollection<PropertyTrace> tracesCollection,
        List<string> ownerIds)
    {
        if (await propertiesCollection.CountDocumentsAsync(FilterDefinition<Property>.Empty) != 0)
            return;

        GeneratePropertiesData(ownerIds, out var propertiesToSeed, out var imagesToSeed, out var tracesToSeed);

        await propertiesCollection.InsertManyAsync(propertiesToSeed);
        await imagesCollection.InsertManyAsync(imagesToSeed);
        await tracesCollection.InsertManyAsync(tracesToSeed);
    }

    private static void GeneratePropertiesData(
        List<string> ownerIds,
        out List<Property> propertiesToSeed,
        out List<PropertyImage> imagesToSeed,
        out List<PropertyTrace> tracesToSeed)
    {
        propertiesToSeed = new List<Property>();
        imagesToSeed = new List<PropertyImage>();
        tracesToSeed = new List<PropertyTrace>();

        for (int i = 0; i < 100; i++)
        {
            var propId = ObjectId.GenerateNewId().ToString();
            var city = SeedDataConstants.Cities[_rand.Next(SeedDataConstants.Cities.Length)];
            var country = SeedDataConstants.CitiesAndCountries[city];
            var type = SeedDataConstants.PropertyTypes[_rand.Next(SeedDataConstants.PropertyTypes.Length)];
            var street = SeedDataConstants.StreetNames[_rand.Next(SeedDataConstants.StreetNames.Length)];
            var year = _rand.Next(1980, 2024);
            var bedrooms = _rand.Next(1, 7);
            var bathrooms = _rand.Next(1, Math.Max(2, bedrooms));
            var squareMeters = _rand.Next(50, 800);

            var description = BuildDescription(type, city, bedrooms, bathrooms, squareMeters, year);

            var property = new Property
            {
                IdProperty = propId,
                Name = $"{type} en {city}",
                Address = $"{_rand.Next(1, 1000)} {street}, {city}, {country}",
                Price = _rand.Next(200000, 8000000),
                CodeInternal = $"{city.Substring(0, 2).ToUpper()}{i:000}",
                Year = year,
                Description = description,
                Bedrooms = bedrooms,
                Bathrooms = bathrooms,
                SquareMeters = squareMeters,
                IdOwner = ownerIds[_rand.Next(ownerIds.Count)]
            };
            propertiesToSeed.Add(property);

            foreach (var url in GetRandomImageUrls(5))
            {
                imagesToSeed.Add(new PropertyImage
                {
                    IdPropertyImage = ObjectId.GenerateNewId().ToString(),
                    Enabled = true,
                    File = url,
                    IdProperty = propId
                });
            }

            var numberOfTraces = _rand.Next(1, 5);
            DateTime lastSaleDate = new(year, _rand.Next(1, 12), _rand.Next(1, 28));
            decimal lastSaleValue = property.Price * (decimal)(0.7 + _rand.NextDouble() * 0.2);

            for (int k = 0; k < numberOfTraces; k++)
            {
                if (k > 0)
                {
                    lastSaleDate = lastSaleDate.AddYears(_rand.Next(1, 4)).AddMonths(_rand.Next(1, 12));
                    if (lastSaleDate > DateTime.Now)
                        lastSaleDate = DateTime.Now.AddDays(-_rand.Next(1, 90));
                    lastSaleValue *= (decimal)(1.05 + _rand.NextDouble() * 0.15);
                }

                tracesToSeed.Add(new PropertyTrace
                {
                    IdPropertyTrace = ObjectId.GenerateNewId().ToString(),
                    DateSale = lastSaleDate,
                    Name = (k == 0) ? "Venta Inicial" : $"Reventa {k}",
                    Value = Math.Round(lastSaleValue, 2),
                    Tax = Math.Round(lastSaleValue * 0.05m, 2),
                    IdProperty = propId
                });
            }
        }
    }

    private static string BuildDescription(string type, string city, int bedrooms, int bathrooms, int squareMeters, int year)
    {
        return SeedDataConstants.Descriptions[_rand.Next(SeedDataConstants.Descriptions.Length)]
            .Replace("{tipo}", type)
            .Replace("{ciudad}", city)
            .Replace("{hab}", bedrooms.ToString())
            .Replace("{ban}", bathrooms.ToString())
            .Replace("{metros}", squareMeters.ToString())
            .Replace("{ano}", year.ToString());
    }

    private static IEnumerable<string> GetRandomImageUrls(int count)
    {
        return SeedDataConstants.LuxuryImageUrls
            .OrderBy(_ => _rand.Next())
            .Take(count);
    }
}

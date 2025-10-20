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

    private static readonly string[] _propertyTypes = {
        "Lujoso Penthouse", "Moderno Apartamento", "Villa frente al mar", "Acogedora Casa de campo",
        "Loft Industrial", "Chalet Suizo", "Bungalow en la playa", "Residencia Histórica"
    };

    private static readonly Dictionary<string, string> _citiesAndCountries = new()
    {
        { "New York", "Estados Unidos de América" },
        { "Paris", "Francia" },
        { "Tokyo", "Japón" },
        { "London", "Reino Unido" },
        { "Bogotá", "Colombia" },
        { "Sydney", "Australia" },
        { "Berlin", "Alemania" },
        { "Dubai", "Emiratos Árabes Unidos" },
        { "Toronto", "Canadá" },
        { "Madrid", "España" },
        { "Roma", "Italia" },
        { "Buenos Aires", "Argentina" },
        { "Ciudad de México", "México" }
    };
    private static readonly string[] _cities = _citiesAndCountries.Keys.ToArray();

    private static readonly string[] _streetNames = {
        "Main St", "Ocean Drive", "Rue de Rivoli", "King's Road", "Avenida Siempre Viva",
        "Shibuya Crossing", "Kurfürstendamm", "Calle 85"
    };

    private static readonly string[] _descriptions = {
        "Descubre este impresionante {tipo} ubicado en el corazón de {ciudad}. Con {hab} habitaciones y {ban} baños, esta propiedad ofrece {metros} metros cuadrados de puro lujo. Los acabados de alta gama, la cocina de chef y las vistas panorámicas de la ciudad te dejarán sin aliento. El edificio cuenta con seguridad 24/7, piscina privada y gimnasio.",
        "Esta encantadora {tipo} es el refugio perfecto lejos del bullicio. Situada en una tranquila calle de {ciudad}, esta casa construida en {ano} combina el encanto rústico con comodidades modernas. Disfruta de {hab} amplias habitaciones y un vasto jardín ideal para reuniones familiares.",
        "Un {tipo} de diseño vanguardista en la vibrante {ciudad}. Destaca por sus espacios abiertos, techos altos y abundante luz natural. Ideal para profesionales creativos o amantes del diseño contemporáneo.",
        "Vive el sueño en esta espectacular {tipo} con acceso directo a la playa en {ciudad}. Despierta cada mañana con el sonido de las olas y vistas inigualables al océano.",
        "Una {tipo} con un carácter inigualable, construida en {ano}. Restaurada con esmero, combina lujo moderno con historia en pleno centro de {ciudad}."
    };

    // 🔹 Lista fija de 50 imágenes de Pexels
    private static readonly List<string> _luxuryImageUrls = new()
    {
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
        "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
        "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg",
        "https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg",
        "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
        "https://images.pexels.com/photos/2506990/pexels-photo-2506990.jpeg",
        "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
        "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
        "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg",
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
        "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
        "https://images.pexels.com/photos/2227832/pexels-photo-2227832.jpeg",
        "https://images.pexels.com/photos/5563472/pexels-photo-5563472.jpeg",
        "https://images.pexels.com/photos/276554/pexels-photo-276554.jpeg",
        "https://images.pexels.com/photos/210464/pexels-photo-210464.jpeg",
        "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg",
        "https://images.pexels.com/photos/3034343/pexels-photo-3034343.jpeg",
        "https://images.pexels.com/photos/453201/pexels-photo-453201.jpeg",
        "https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg",
        "https://images.pexels.com/photos/259593/pexels-photo-259593.jpeg",
        "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg",
        "https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg",
        "https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg",
        "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg",
        "https://images.pexels.com/photos/3315291/pexels-photo-3315291.jpeg",
        "https://images.pexels.com/photos/1457841/pexels-photo-1457841.jpeg",
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
        "https://images.pexels.com/photos/533157/pexels-photo-533157.jpeg",
        "https://images.pexels.com/photos/447592/pexels-photo-447592.jpeg",
        "https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg",
        "https://images.pexels.com/photos/2506986/pexels-photo-2506986.jpeg",
        "https://images.pexels.com/photos/2155202/pexels-photo-2155202.jpeg",
        "https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg",
        "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg",
        "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg",
        "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg",
        "https://images.pexels.com/photos/1046639/pexels-photo-1046639.jpeg",
        "https://images.pexels.com/photos/34354721/pexels-photo-34354721.jpeg",
        "https://images.pexels.com/photos/34354725/pexels-photo-34354725.jpeg",
        "https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg",
        "https://images.pexels.com/photos/6775268/pexels-photo-6775268.jpeg",
        "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg",
        "https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg",
        "https://images.pexels.com/photos/2343466/pexels-photo-2343466.jpeg",
        "https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg",
        "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg",
        "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
        "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
        "https://images.pexels.com/photos/1693946/pexels-photo-1693946.jpeg",
        "https://images.pexels.com/photos/3316926/pexels-photo-3316926.jpeg"
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
                new() { IdOwner = ObjectId.GenerateNewId().ToString(), Name = "Fatima Al-Fassi", Address = "789 Desert Blvd, Dubai", Birthday = new DateTime(1995, 7, 22), Photo = "https://i.pravatar.cc/150?u=fatima" }
            };

            await ownersCollection.InsertManyAsync(owners);
            ownerIds = owners.Select(o => o.IdOwner).ToList();
        }
        else
        {
            ownerIds = (await ownersCollection.Find(FilterDefinition<Owner>.Empty).ToListAsync()).Select(o => o.IdOwner).ToList();
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
                var country = _citiesAndCountries[city];
                var type = _propertyTypes[_rand.Next(_propertyTypes.Length)];
                var street = _streetNames[_rand.Next(_streetNames.Length)];
                var year = _rand.Next(1980, 2024);
                var bedrooms = _rand.Next(1, 7);
                var bathrooms = _rand.Next(1, Math.Max(2, bedrooms));
                var squareMeters = _rand.Next(50, 800);

                var description = _descriptions[_rand.Next(_descriptions.Length)]
                    .Replace("{tipo}", type)
                    .Replace("{ciudad}", city)
                    .Replace("{hab}", bedrooms.ToString())
                    .Replace("{ban}", bathrooms.ToString())
                    .Replace("{metros}", squareMeters.ToString())
                    .Replace("{ano}", year.ToString());

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

                // 🔹 Usa 5 imágenes aleatorias de la lista
                var shuffled = _luxuryImageUrls.OrderBy(_ => _rand.Next()).Take(5);
                foreach (var url in shuffled)
                {
                    imagesToSeed.Add(new PropertyImage
                    {
                        IdPropertyImage = ObjectId.GenerateNewId().ToString(),
                        Enabled = true,
                        File = url,
                        IdProperty = propId
                    });
                }

                // 🔹 PropertyTraces
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

            await propertiesCollection.InsertManyAsync(propertiesToSeed);
            await imagesCollection.InsertManyAsync(imagesToSeed);
            await tracesCollection.InsertManyAsync(tracesToSeed);
        }
    }
}

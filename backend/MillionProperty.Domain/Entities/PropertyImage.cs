namespace MillionProperty.Domain;

public class PropertyImage
{
    [BsonId] 
    [BsonRepresentation(BsonType.ObjectId)] 
    public string IdPropertyImage { get; set; }
    public bool Enabled { get; set; }
    public string File { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    public string IdPropery { get; set; } 
}
namespace MillionProperty.Domain.Entities;

public class PropertyImage
{
    [BsonId] 
    [BsonRepresentation(BsonType.ObjectId)] 
    public string IdPropertyImage { get; set; }= string.Empty; 
    public bool Enabled { get; set; }
    public string File { get; set; }= string.Empty; 

    [BsonRepresentation(BsonType.ObjectId)]
    public string IdProperty { get; set; } = string.Empty;
}
namespace MillionProperty.Domain;

public class PropertyTrace
{
    [BsonId] 
    [BsonRepresentation(BsonType.ObjectId)] 
    public string IdPropertyTrace { get; set; }

    public DateTime DateSale { get; set; }  
    public string Name { get; set; }
    public decimal Value { get; set; }
    public decimal Tax { get; set; }
    
    [BsonRepresentation(BsonType.ObjectId)]
    public string IdProperty { get; set; } 
}
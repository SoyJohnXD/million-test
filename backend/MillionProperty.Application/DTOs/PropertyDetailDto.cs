namespace MillionProperty.Application.DTOs;

public class PropertyDetailDto
{
    public string IdProperty { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string CodeInternal { get; set; } = string.Empty;
    public int Year { get; set; }
    public string Description { get; set; } = string.Empty;
    public int Bedrooms { get; set; }
    public int Bathrooms { get; set; }
    public double SquareMeters { get; set; }
    public OwnerDto? Owner { get; set; }
    public List<string> ImageUrls { get; set; } = new();
    public List<PropertyTraceDto> Traces { get; set; } = new();
}
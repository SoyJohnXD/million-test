namespace MillionProperty.Application.DTOs;
public class PropertyListDto
{
    public string IdProperty { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }

    public int Bedrooms { get; set; }
    public int Bathrooms { get; set; }
    public double SquareMeters { get; set; }
    public OwnerSummaryDto? Owner { get; set; }
}
namespace MillionProperty.Application.Features.Properties.Queries;
public class GetFilteredPropertiesQuery : IRequest<PaginatedListDto<PropertyListDto>>
{
    public string? Name { get; set; }
    public string? Address { get; set; }
    public decimal? MinPrice { get; set; }
    public decimal? MaxPrice { get; set; }
    public int? Bedrooms { get; set; } 
    public int? Bathrooms { get; set; } 
    public int? MinYear { get; set; } 
    public double? MinSquareMeters { get; set; }

    private const int MaxPageSize = 50;
    private int _pageSize = 10;
    public int PageNumber { get; set; } = 1;
    
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }
}
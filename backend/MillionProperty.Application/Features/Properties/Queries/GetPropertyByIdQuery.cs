namespace MillionProperty.Application.Features.Properties.Queries;
public class GetPropertyByIdQuery : IRequest<PropertyDetailDto?>
{
    public string Id { get; set; } = string.Empty;
}
namespace MillionProperty.Application.Mappings;
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Property, PropertyListDto>();
        CreateMap<Owner, OwnerSummaryDto>();

        CreateMap<Property, PropertyDetailDto>();
        CreateMap<Owner, OwnerDto>();
        CreateMap<PropertyTrace, PropertyTraceDto>();
    }
}
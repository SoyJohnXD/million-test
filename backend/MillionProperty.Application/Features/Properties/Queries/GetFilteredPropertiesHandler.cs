namespace MillionProperty.Application.Features.Properties.Queries;


public class GetFilteredPropertiesQueryHandler : IRequestHandler<GetFilteredPropertiesQuery, PaginatedListDto<PropertyListDto>>
{
    private readonly IPropertyRepository _propertyRepository;
    private readonly IPropertyImageRepository _propertyImageRepository;
    private readonly IOwnerRepository _ownerRepository; 
    private readonly IMapper _mapper;

    public GetFilteredPropertiesQueryHandler(
        IPropertyRepository propertyRepository,
        IPropertyImageRepository propertyImageRepository,
        IOwnerRepository ownerRepository,
        IMapper mapper)
    {
        _propertyRepository = propertyRepository;
        _propertyImageRepository = propertyImageRepository;
        _ownerRepository = ownerRepository;
        _mapper = mapper;
    }

    public async Task<PaginatedListDto<PropertyListDto>> Handle(GetFilteredPropertiesQuery request, CancellationToken cancellationToken)
    {
        var (properties, totalCount) = await _propertyRepository.GetByFiltersAsync(
            request.Name,
            request.Address,
            request.MinPrice,
            request.MaxPrice,
            request.PageNumber,
            request.PageSize
        );

        var propertyDtos = new List<PropertyListDto>();
        
        if (properties.Any())
        {   
           
            var ownerIds = properties.Select(p => p.IdOwner).Distinct();
            var owners = (await _ownerRepository.GetByIdsAsync(ownerIds))
                        .ToDictionary(o => o.IdOwner); 

            propertyDtos = _mapper.Map<List<PropertyListDto>>(properties);

            foreach (var dto in propertyDtos)
            {
                var image = await _propertyImageRepository.GetFirstEnabledImageByPropertyIdAsync(dto.IdProperty);
                dto.ImageUrl = image?.File ?? "https://via.placeholder.com/300x200";

                var property = properties.First(p => p.IdProperty == dto.IdProperty);

                if (owners.TryGetValue(property.IdOwner, out var owner))
                {
                    dto.Owner = _mapper.Map<OwnerSummaryDto>(owner);
                }
            }
         }

        return new PaginatedListDto<PropertyListDto>(
            propertyDtos, 
            totalCount, 
            request.PageNumber, 
            request.PageSize
        );
    }
}
namespace MillionProperty.Application.Features.Properties.Queries;

public class GetPropertyByIdQueryHandler : IRequestHandler<GetPropertyByIdQuery, PropertyDetailDto?>
{
    private readonly IPropertyRepository _propertyRepo;
    private readonly IOwnerRepository _ownerRepo;
    private readonly IPropertyImageRepository _imageRepo;
    private readonly IPropertyTraceRepository _traceRepo;
    private readonly IMapper _mapper;

    public GetPropertyByIdQueryHandler(IPropertyRepository propertyRepo, IOwnerRepository ownerRepo, IPropertyImageRepository imageRepo, IPropertyTraceRepository traceRepo, IMapper mapper)
    {
        _propertyRepo = propertyRepo;
        _ownerRepo = ownerRepo;
        _imageRepo = imageRepo;
        _traceRepo = traceRepo;
        _mapper = mapper;
    }

    public async Task<PropertyDetailDto?> Handle(GetPropertyByIdQuery request, CancellationToken cancellationToken)
    {
        var property = await _propertyRepo.GetByIdAsync(request.Id);
        if (property is null)
        {
            return null; 
        }

    
        var ownerTask = _ownerRepo.GetByIdAsync(property.IdOwner);
        var imagesTask = _imageRepo.GetAllByPropertyIdAsync(property.IdProperty);
        var tracesTask = _traceRepo.GetByPropertyIdAsync(property.IdProperty);

        await Task.WhenAll(ownerTask, imagesTask, tracesTask);

    
        var propertyDetailDto = _mapper.Map<PropertyDetailDto>(property);
        propertyDetailDto.Owner = _mapper.Map<OwnerDto>(await ownerTask);
        propertyDetailDto.ImageUrls = (await imagesTask).Select(img => img.File).ToList();
        propertyDetailDto.Traces = _mapper.Map<List<PropertyTraceDto>>(await tracesTask);

        return propertyDetailDto;
    }
}
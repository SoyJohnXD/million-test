namespace MillionProperty.API.Controllers;

using MillionProperty.Application.DTOs;
using  MillionProperty.API.Responses;

[ApiController]
[Route("api/[controller]")]
public class PropertiesController : ControllerBase
{
    private readonly IMediator _mediator;

    public PropertiesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResponse<PaginatedListDto<PropertyListDto>>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ApiResponse<string>))]
    public async Task<IActionResult> GetProperties([FromQuery] GetFilteredPropertiesQuery query)
    {
        var properties = await _mediator.Send(query); 
        
        var response = new ApiResponse<PaginatedListDto<PropertyListDto>>(properties, "Properties retrieved successfully.");
        
        return Ok(response);
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResponse<PropertyDetailDto>))]
    [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ApiResponse<object>))]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ApiResponse<object>))] // Nuevo
    public async Task<IActionResult> GetPropertyById(string id)
    {
        if (!ObjectId.TryParse(id, out _))
        {
            return BadRequest(new ApiResponse<object>("Invalid property ID format."));
        }
    
        var query = new GetPropertyByIdQuery { Id = id };
        var result = await _mediator.Send(query);

        if (result is null)
        {
            return NotFound(new ApiResponse<object>("Property not found."));
        }

        return Ok(new ApiResponse<PropertyDetailDto>(result, "Property details retrieved successfully."));
    }
}
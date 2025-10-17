using MillionProperty.API.Controllers;
using MillionProperty.API.Responses;
using MillionProperty.Application.DTOs;
using MillionProperty.Application.Features.Properties.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

namespace MillionProperty.Tests.Unit.API.Controllers;

[TestFixture]
public class PropertiesControllerTests
{
    private Mock<IMediator> _mockMediator;
    private PropertiesController _controller;

    [SetUp]
    public void Setup()
    {
        _mockMediator = new Mock<IMediator>();
        _controller = new PropertiesController(_mockMediator.Object);
    }

    [Test]
    public async Task GetProperties_Should_ReturnOk200_WithPaginatedList()
    {
        var query = new GetFilteredPropertiesQuery();
        var paginatedList = new PaginatedListDto<PropertyListDto>(new List<PropertyListDto>(), 0, 1, 10);
        
        _mockMediator.Setup(m => m.Send(query, It.IsAny<CancellationToken>()))
            .ReturnsAsync(paginatedList);

        var result = await _controller.GetProperties(query);

        Assert.IsInstanceOf<OkObjectResult>(result, "El resultado debe ser un 200 OK.");
        
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult.Value);
        Assert.IsInstanceOf<ApiResponse<PaginatedListDto<PropertyListDto>>>(okResult.Value);
    }

    [Test]
    public async Task GetPropertyById_Should_ReturnOk200_WhenPropertyExists()
    {
        var validId = "60c72b2f9b1e8a3a9c8b4567"; // Un ObjectId válido
        var propertyDto = new PropertyDetailDto { IdProperty = validId, Name = "Test" };

        _mockMediator.Setup(m => m.Send(It.Is<GetPropertyByIdQuery>(q => q.Id == validId), It.IsAny<CancellationToken>()))
            .ReturnsAsync(propertyDto);

        var result = await _controller.GetPropertyById(validId);

        Assert.IsInstanceOf<OkObjectResult>(result, "El resultado debe ser un 200 OK.");

        var okResult = result as OkObjectResult;
        var apiResponse = okResult.Value as ApiResponse<PropertyDetailDto>;
        Assert.That(apiResponse.Content.IdProperty, Is.EqualTo(validId));
    }

    [Test]
    public async Task GetPropertyById_Should_ReturnNotFound404_WhenPropertyDoesNotExist()
    {
        var notFoundId = "60c72b2f9b1e8a3a9c8b4568";
        
        _mockMediator.Setup(m => m.Send(It.Is<GetPropertyByIdQuery>(q => q.Id == notFoundId), It.IsAny<CancellationToken>()))
            .ReturnsAsync((PropertyDetailDto?)null);

        var result = await _controller.GetPropertyById(notFoundId);

        Assert.IsInstanceOf<NotFoundObjectResult>(result, "El resultado debe ser un 404 Not Found.");
    }

    [Test]
    public async Task GetPropertyById_Should_ReturnBadRequest400_WhenIdIsInvalid()
    {
        var invalidId = "hola-mundo"; 

        var result = await _controller.GetPropertyById(invalidId);

        Assert.IsInstanceOf<BadRequestObjectResult>(result, "El resultado debe ser un 400 Bad Request.");
        
        _mockMediator.Verify(m => m.Send(It.IsAny<GetPropertyByIdQuery>(), It.IsAny<CancellationToken>()), Times.Never);
    }
}
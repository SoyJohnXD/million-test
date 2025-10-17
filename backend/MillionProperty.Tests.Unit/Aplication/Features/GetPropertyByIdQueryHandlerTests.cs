using AutoMapper;
using MillionProperty.Application.DTOs;
using MillionProperty.Application.Features.Properties.Queries;
using MillionProperty.Application.Mappings;
using MillionProperty.Domain.Entities;
using MillionProperty.Domain.Interfaces;
using Moq;
using NUnit.Framework;

namespace MillionProperty.Tests.Unit.Application.Features;

[TestFixture]
public class GetPropertyByIdQueryHandlerTests
{
    private Mock<IPropertyRepository> _mockPropertyRepo;
    private Mock<IOwnerRepository> _mockOwnerRepo;
    private Mock<IPropertyImageRepository> _mockImageRepo;
    private Mock<IPropertyTraceRepository> _mockTraceRepo;
    private IMapper _mapper;

    private GetPropertyByIdQueryHandler _handler;

    [SetUp]
    public void Setup()
    {
        _mockPropertyRepo = new Mock<IPropertyRepository>();
        _mockOwnerRepo = new Mock<IOwnerRepository>();
        _mockImageRepo = new Mock<IPropertyImageRepository>();
        _mockTraceRepo = new Mock<IPropertyTraceRepository>();

        var mapperConfig = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile(new MappingProfile());
        });
        _mapper = mapperConfig.CreateMapper();

        _handler = new GetPropertyByIdQueryHandler(
            _mockPropertyRepo.Object,
            _mockOwnerRepo.Object,
            _mockImageRepo.Object,
            _mockTraceRepo.Object,
            _mapper
        );
    }

    [Test]
    public async Task Handle_Should_ReturnPropertyDetail_WhenPropertyExists()
    {
        var propertyId = "prop1";
        var ownerId = "owner1";
        
        var fakeProperty = new Property { IdProperty = propertyId, IdOwner = ownerId, Name = "Casa Detalle" };
        var fakeOwner = new Owner { IdOwner = ownerId, Name = "Dueño Detalle" };
        var fakeImages = new List<PropertyImage>
        {
            new() { IdProperty = propertyId, File = "detalle1.jpg" },
            new() { IdProperty = propertyId, File = "detalle2.jpg" }
        };
        var fakeTraces = new List<PropertyTrace>
        {
            new() { IdProperty = propertyId, Name = "Venta Inicial", Value = 500000 }
        };

        var query = new GetPropertyByIdQuery { Id = propertyId };

        _mockPropertyRepo.Setup(repo => repo.GetByIdAsync(propertyId)).ReturnsAsync(fakeProperty);
        _mockOwnerRepo.Setup(repo => repo.GetByIdAsync(ownerId)).ReturnsAsync(fakeOwner);
        _mockImageRepo.Setup(repo => repo.GetAllByPropertyIdAsync(propertyId)).ReturnsAsync(fakeImages);
        _mockTraceRepo.Setup(repo => repo.GetByPropertyIdAsync(propertyId)).ReturnsAsync(fakeTraces);

        var result = await _handler.Handle(query, CancellationToken.None);

        Assert.IsNotNull(result);
        Assert.That(result.Name, Is.EqualTo(fakeProperty.Name));
        
        Assert.IsNotNull(result.Owner);
        Assert.That(result.Owner.Name, Is.EqualTo(fakeOwner.Name));
        
        Assert.That(result.ImageUrls.Count, Is.EqualTo(2));
        Assert.That(result.ImageUrls[0], Is.EqualTo("detalle1.jpg"));
        
        Assert.That(result.Traces.Count, Is.EqualTo(1));
        Assert.That(result.Traces[0].Name, Is.EqualTo("Venta Inicial"));

        _mockPropertyRepo.Verify(repo => repo.GetByIdAsync(propertyId), Times.Once);
        _mockOwnerRepo.Verify(repo => repo.GetByIdAsync(ownerId), Times.Once);
        _mockImageRepo.Verify(repo => repo.GetAllByPropertyIdAsync(propertyId), Times.Once);
        _mockTraceRepo.Verify(repo => repo.GetByPropertyIdAsync(propertyId), Times.Once);
    }

    [Test]
    public async Task Handle_Should_ReturnNull_WhenPropertyDoesNotExist()
    {
        var notFoundId = "id-no-existe";
        var query = new GetPropertyByIdQuery { Id = notFoundId };

        _mockPropertyRepo.Setup(repo => repo.GetByIdAsync(notFoundId))
            .ReturnsAsync((Property?)null); 

        var result = await _handler.Handle(query, CancellationToken.None);

    
        Assert.IsNull(result);

        _mockPropertyRepo.Verify(repo => repo.GetByIdAsync(notFoundId), Times.Once);
        
        _mockOwnerRepo.Verify(repo => repo.GetByIdAsync(It.IsAny<string>()), Times.Never);
        _mockImageRepo.Verify(repo => repo.GetAllByPropertyIdAsync(It.IsAny<string>()), Times.Never);
        _mockTraceRepo.Verify(repo => repo.GetByPropertyIdAsync(It.IsAny<string>()), Times.Never);
    }
}
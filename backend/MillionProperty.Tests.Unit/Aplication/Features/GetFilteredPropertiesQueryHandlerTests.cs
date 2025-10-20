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
public class GetFilteredPropertiesQueryHandlerTests
{
    private Mock<IPropertyRepository> _mockPropertyRepo;
    private Mock<IOwnerRepository> _mockOwnerRepo;
    private Mock<IPropertyImageRepository> _mockImageRepo;
    private IMapper _mapper;

    private GetFilteredPropertiesQueryHandler _handler;

    [SetUp]
    public void Setup()
    {
        
        _mockPropertyRepo = new Mock<IPropertyRepository>();
        _mockOwnerRepo = new Mock<IOwnerRepository>();
        _mockImageRepo = new Mock<IPropertyImageRepository>();

        var mapperConfig = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile(new MappingProfile());
        });
        _mapper = mapperConfig.CreateMapper();

        _handler = new GetFilteredPropertiesQueryHandler(
            _mockPropertyRepo.Object,
            _mockImageRepo.Object,
            _mockOwnerRepo.Object,
            _mapper
        );
    }

    [Test]
    public async Task Handle_Should_ReturnPaginatedList_WhenPropertiesExist()
    {
        var fakeProperties = new List<Property>
        {
            new() { IdProperty = "prop1", IdOwner = "owner1", Name = "Property 1" },
            new() { IdProperty = "prop2", IdOwner = "owner2", Name = "Property 2" }
        };
        var fakeOwners = new List<Owner>
        {
            new() { IdOwner = "owner1", Name = "Owner One" },
            new() { IdOwner = "owner2", Name = "Owner Two" }
        };
        var fakeImage1 = new PropertyImage { IdProperty = "prop1", File = "url1.jpg" };
        var fakeImage2 = new PropertyImage { IdProperty = "prop2", File = "url2.jpg" };

        var query = new GetFilteredPropertiesQuery { PageNumber = 1, PageSize = 10 };

        _mockPropertyRepo.Setup(repo => repo.GetByFiltersAsync(
                It.IsAny<string>(),              
                It.IsAny<string>(),              
                It.IsAny<decimal?>(),             
                It.IsAny<decimal?>(),             
                It.IsAny<int?>(),                 
                It.IsAny<int?>(),                
                It.IsAny<int?>(),                
                It.IsAny<double?>(),             
                It.Is<int>(p => p == 1),         
                It.Is<int>(s => s == 10)))        
            .ReturnsAsync((fakeProperties, 2));

        _mockOwnerRepo.Setup(repo => repo.GetByIdsAsync(It.Is<IEnumerable<string>>(ids => ids.Contains("owner1") && ids.Contains("owner2"))))
            .ReturnsAsync(fakeOwners);

        _mockImageRepo.Setup(repo => repo.GetFirstEnabledImageByPropertyIdAsync("prop1")).ReturnsAsync(fakeImage1);
        _mockImageRepo.Setup(repo => repo.GetFirstEnabledImageByPropertyIdAsync("prop2")).ReturnsAsync(fakeImage2);

        var result = await _handler.Handle(query, CancellationToken.None);

        Assert.IsNotNull(result);
        Assert.That(result.TotalCount, Is.EqualTo(2));
        Assert.That(result.Items.Count, Is.EqualTo(2));
        Assert.That(result.CurrentPage, Is.EqualTo(1));

        Assert.That(result.Items[0].Name, Is.EqualTo("Property 1"));
        Assert.That(result.Items[0].Owner?.Name, Is.EqualTo("Owner One"));
        Assert.That(result.Items[0].ImageUrl, Is.EqualTo("url1.jpg"));

        Assert.That(result.Items[1].Name, Is.EqualTo("Property 2"));
        Assert.That(result.Items[1].Owner?.Name, Is.EqualTo("Owner Two"));
        Assert.That(result.Items[1].ImageUrl, Is.EqualTo("url2.jpg"));

    _mockOwnerRepo.Verify(repo => repo.GetByIdsAsync(It.IsAny<IEnumerable<string>>()), Times.Once, "The owner repository should be called only once.");
    }
    
    [Test]
    public async Task Handle_Should_ReturnProperties_WhenSomeOwnersAreNotFound()
    {
        var fakeProperties = new List<Property>
        {
            new() { IdProperty = "prop1", IdOwner = "owner1", Name = "Property 1" },
            new() { IdProperty = "prop2", IdOwner = "owner2", Name = "Property 2" }
        };

        var returnedOwners = new List<Owner>
        {
            new() { IdOwner = "owner2", Name = "Owner Two" }
        };

        var img1 = new PropertyImage { IdProperty = "prop1", File = "url1.jpg" };
        var img2 = new PropertyImage { IdProperty = "prop2", File = "url2.jpg" };

        var query = new GetFilteredPropertiesQuery { PageNumber = 1, PageSize = 10 };

        _mockPropertyRepo
            .Setup(repo => repo.GetByFiltersAsync(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<decimal?>(),
                It.IsAny<decimal?>(),
                It.IsAny<int?>(),
                It.IsAny<int?>(),
                It.IsAny<int?>(),
                It.IsAny<double?>(),
                It.Is<int>(p => p == 1),
                It.Is<int>(s => s == 10)))
            .ReturnsAsync((fakeProperties, 2));

        _mockOwnerRepo
            .Setup(repo => repo.GetByIdsAsync(It.Is<IEnumerable<string>>(ids => ids.Contains("owner1") && ids.Contains("owner2"))))
            .ReturnsAsync(returnedOwners);

        _mockImageRepo.Setup(repo => repo.GetFirstEnabledImageByPropertyIdAsync("prop1")).ReturnsAsync(img1);
        _mockImageRepo.Setup(repo => repo.GetFirstEnabledImageByPropertyIdAsync("prop2")).ReturnsAsync(img2);

        var result = await _handler.Handle(query, CancellationToken.None);

        Assert.IsNotNull(result);
        Assert.That(result.TotalCount, Is.EqualTo(2));
        Assert.That(result.Items.Count, Is.EqualTo(2));

        var p1 = result.Items.First(i => i.IdProperty == "prop1");
        var p2 = result.Items.First(i => i.IdProperty == "prop2");

        Assert.IsNull(p1.Owner, "Owner should be null when not found in repository.");
        Assert.IsNotNull(p2.Owner, "Owner should be populated when found.");
        Assert.That(p2.Owner!.Name, Is.EqualTo("Owner Two"));

        Assert.That(p1.ImageUrl, Is.EqualTo("url1.jpg"));
        Assert.That(p2.ImageUrl, Is.EqualTo("url2.jpg"));

        _mockOwnerRepo.Verify(repo => repo.GetByIdsAsync(It.IsAny<IEnumerable<string>>()), Times.Once);
        _mockImageRepo.Verify(repo => repo.GetFirstEnabledImageByPropertyIdAsync(It.IsAny<string>()), Times.Exactly(2));
    }

    [Test]
    public async Task Handle_Should_AssignPlaceholderImageUrl_WhenNoImageExistsForProperty()
    {
        var fakeProperties = new List<Property>
        {
            new() { IdProperty = "prop3", IdOwner = "owner3", Name = "Property 3" }
        };

        var owners = new List<Owner>
        {
            new() { IdOwner = "owner3", Name = "Owner Three" }
        };

        var query = new GetFilteredPropertiesQuery { PageNumber = 1, PageSize = 10 };

        _mockPropertyRepo
            .Setup(repo => repo.GetByFiltersAsync(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<decimal?>(),
                It.IsAny<decimal?>(),
                It.IsAny<int?>(),
                It.IsAny<int?>(),
                It.IsAny<int?>(),
                It.IsAny<double?>(),
                It.Is<int>(p => p == 1),
                It.Is<int>(s => s == 10)))
            .ReturnsAsync((fakeProperties, 1));

        _mockOwnerRepo
            .Setup(repo => repo.GetByIdsAsync(It.IsAny<IEnumerable<string>>()))
            .ReturnsAsync(owners);

        _mockImageRepo
            .Setup(repo => repo.GetFirstEnabledImageByPropertyIdAsync("prop3"))
            .ReturnsAsync((PropertyImage?)null);

        var result = await _handler.Handle(query, CancellationToken.None);

        Assert.IsNotNull(result);
        Assert.That(result.Items.Count, Is.EqualTo(1));
        Assert.That(result.Items[0].ImageUrl, Is.EqualTo("https://via.placeholder.com/300x200"));
        Assert.That(result.Items[0].Owner?.Name, Is.EqualTo("Owner Three"));

        _mockImageRepo.Verify(repo => repo.GetFirstEnabledImageByPropertyIdAsync("prop3"), Times.Once);
    }
    
    [Test]
    public async Task Handle_Should_ReturnEmptyPaginatedList_WhenNoPropertiesExist()
    {
        var emptyProperties = new List<Property>();
        var query = new GetFilteredPropertiesQuery { PageNumber = 1, PageSize = 10 };

        _mockPropertyRepo.Setup(repo => repo.GetByFiltersAsync(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<decimal?>(),
                It.IsAny<decimal?>(),
                It.IsAny<int?>(),
                It.IsAny<int?>(),
                It.IsAny<int?>(),
                It.IsAny<double?>(),
                It.Is<int>(p => p == 1),
                It.Is<int>(s => s == 10)))
            .ReturnsAsync((emptyProperties, 0));

        var result = await _handler.Handle(query, CancellationToken.None);

        Assert.IsNotNull(result);
        Assert.That(result.TotalCount, Is.EqualTo(0));
        Assert.That(result.Items, Is.Empty);

    _mockOwnerRepo.Verify(repo => repo.GetByIdsAsync(It.IsAny<IEnumerable<string>>()), Times.Never, "The owner repository should not be called when there are no properties.");
    _mockImageRepo.Verify(repo => repo.GetFirstEnabledImageByPropertyIdAsync(It.IsAny<string>()), Times.Never, "The image repository should not be called when there are no properties.");
    }
}
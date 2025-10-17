using MillionProperty.Domain.Entities;
namespace MillionProperty.Domain.Interfaces;
public interface IOwnerPropertyRepository
{
    Task<Owner> GetByIdAsync(string idOwner);
    Task AddAsync(Owner owner);
}
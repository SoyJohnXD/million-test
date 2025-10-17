using MillionProperty.Domain.Entities;

namespace MillionProperty.Domain.Interfaces;
public interface IOwnerRepository
{
    Task<IEnumerable<Owner>> GetByIdsAsync(IEnumerable<string> ownerIds);
    Task<Owner?> GetByIdAsync(string idOwner);
}
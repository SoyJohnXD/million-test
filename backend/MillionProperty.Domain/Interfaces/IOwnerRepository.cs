public interface IOwnerPropertyRepository
{
    Task<Owner> GetByIdAsync(string idOwner);
    Task AddAsync(Owner owner);
}
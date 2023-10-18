using Server.DTOs.Employees;

namespace Client.Contracts;

public interface ICreateRepository : IRepository<CreatedEmployeeDto, Guid>
{
}

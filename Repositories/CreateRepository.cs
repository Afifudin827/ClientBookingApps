using Client.Contracts;
using Server.DTOs.Employees;

namespace Client.Repositories;

public class CreateRepository : GeneralRepository<CreatedEmployeeDto, Guid>, ICreateRepository
{
    public CreateRepository(string request = "Employee/") : base(request)
    {
    }
}

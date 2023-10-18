using Client.Contracts;
using Server.DTOs.Employees;

namespace Client.Repositories;

public class EmployeeRepository : GeneralRepository<EmployeeDto, Guid>, IEmployeeRepository
{
    public EmployeeRepository(string request = "Employee/") : base(request)
    {
    }
}

using Client.Models;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs.Accounts;
using Server.DTOs.Employees;
using Server.Utilities.Handler;

namespace Client.Contracts;

public interface IAccountRepository : IRepository<AccountDto, Guid>
{
    Task<ResponseOKHandler<TokenDto>> Login(LoginDto login);
}

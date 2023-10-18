using Client.Contracts;
using Client.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Server.DTOs.Accounts;
using Server.DTOs.Employees;
using Server.Utilities.Handler;
using System.Net.Http;
using System.Text;

namespace Client.Repositories;

public class AccountRepository : GeneralRepository<AccountDto, Guid>, IAccountRepository
{
    
    public AccountRepository(string request = "Account/") : base(request)
    {
    }

    public async Task<ResponseOKHandler<TokenDto>> Login(LoginDto login)
    {
        string jsonEntity = JsonConvert.SerializeObject(login);
        StringContent content = new StringContent(jsonEntity, Encoding.UTF8, "application/json");

        using (var response = await httpClient.PostAsync($"{request}login", content))
        {
            response.EnsureSuccessStatusCode();
            string apiResponse = await response.Content.ReadAsStringAsync();
            var entityVM = JsonConvert.DeserializeObject<ResponseOKHandler<TokenDto>>(apiResponse);
            return entityVM;
        }
    }
}

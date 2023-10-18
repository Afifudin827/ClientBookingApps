using Client.Contracts;
using Client.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs.Accounts;
using System.Diagnostics;

namespace Client.Controllers;
public class AuthController : Controller
{
    private readonly IAccountRepository _accountRepository;

    public AuthController(IAccountRepository accountRepository)
    {
        _accountRepository = accountRepository;
    }

    
    public IActionResult Login()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginDto login)
    {
        var result = await _accountRepository.Login(login);

        if (result.Status == "OK")
        {

            HttpContext.Session.SetString("JWToken", result.Data.Token);
            return RedirectToAction("Index", "Pokedex");
        }
        return RedirectToAction("Index", "Home");
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;
public class Pokedex : Controller
{
    [Authorize]
    public IActionResult Index()
    {
        return View();
    }
}

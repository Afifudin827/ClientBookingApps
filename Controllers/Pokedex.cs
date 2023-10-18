using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers;
public class Pokedex : Controller
{

    public IActionResult Index()
    {
        return View();
    }
}

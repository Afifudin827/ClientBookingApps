using Client.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Server.DTOs.Employees;
using System;

namespace Client.Controllers;
public class EmployeeController : Controller
{
    private readonly IEmployeeRepository repository;
    private readonly ICreateRepository createrepository;

    public EmployeeController(IEmployeeRepository repository, ICreateRepository createrepository)
    {
        this.repository = repository;
        this.createrepository= createrepository;
    }
    public async Task<IActionResult> Index()
    {
        var result = await repository.Get();
        var listEmployee = new List<EmployeeDto>();
        if (result != null)
        {
            listEmployee = result.Data.ToList();
        }
        return View(listEmployee);
    }

    public IActionResult Create()
    {
        return View();
    }
/*
    [HttpPost]*/
    public async Task<IActionResult> CreateEmployee(CreatedEmployeeDto employeeDto)
    {
        var result = await createrepository.Post(employeeDto);
        return RedirectToAction("Index", "Employee");
    }
    public async Task<IActionResult> Edit(Guid guid)
    {
        var result = await repository.Get(guid);
        var listEmployee = new EmployeeDto();
        if (result != null)
        {
            var lisEmployee =  result.Data;
        }
        return View(result.Data);
    }
    
    [HttpGet]
    public async Task<IActionResult> Details(Guid guid)
    {
        var result = await repository.Get(guid);
        var listEmployee = new EmployeeDto();
        if (result != null)
        {
            var lisEmployee =  result.Data;
        }
        return View(result.Data);
    }
    
    public async Task<IActionResult> UpdateData(EmployeeDto employeeDto)
    {
        var result = await repository.Put(employeeDto.Guid, employeeDto);
        return RedirectToAction("Index", "Employee");
    }
    [Route("Employee/Delete/{Guid}")]
    public async Task<IActionResult> Delete(Guid guid)
    {
        var result = await repository.Delete(guid);
        return RedirectToAction("Index", "Employee");
    }
}

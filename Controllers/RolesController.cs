using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using School_Spa.Data;
using School_Spa.Models;
using School_Spa.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School_Spa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController:Controller
    {
        private RoleManager<ApplicationRole> _roleManager;
        private AppDbContext _ctx;

        public RolesController(RoleManager<ApplicationRole> roleManager, AppDbContext ctx)
        {
            _roleManager = roleManager;
            _ctx = ctx;
        }
        [HttpGet]
        public IQueryable<dynamic> GetRoles()
        {
           var res = _roleManager.Roles.Select(r=> new { r.Name , r.Id });
            return res;
        }
        [HttpGet("id")]
        public  async Task<ApplicationRole> GetRole(string name)
        {
            return await _roleManager.FindByNameAsync(name);
        }
        [HttpPost]
        public async Task<IActionResult> Create(ViewApplicationRoles vm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var role = new ApplicationRole
            {
              Name = vm.Name
            };
            await _roleManager.CreateAsync(role);
           
            return Ok();
        }

        // PUT api/contacts/5

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(string name, ApplicationRole model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var currentState = await _roleManager.FindByNameAsync(name);
            var role = new ApplicationRole
            {
                Id = currentState.Id,
                Name = model.Name,
                NormalizedName= currentState.NormalizedName
            };

           await _roleManager.UpdateAsync(role);
           return Ok();
        }

        // DELETE api/contacts/5

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(string name)
        {
            var role = await _roleManager.FindByNameAsync(name);
            await _roleManager.DeleteAsync(role);
            return Ok();
        }
    }
}

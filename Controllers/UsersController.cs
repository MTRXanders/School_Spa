using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using School_Spa.Models;
using School_Spa.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using School_Spa.Data;
using System.Security.Claims;
using System.Reflection;

namespace School_Spa.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles ="Admin")]
    public class UsersController : Controller
    {
       
        private readonly IRepositoryUsers _repo;
        private readonly AppDbContext _ctx;
        private readonly UserManager<AppIdentityUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public UsersController(AppDbContext ctx, IRepositoryUsers repo, RoleManager<ApplicationRole> roleMgr, UserManager<AppIdentityUser> userMgr)
        {
            _repo = repo;
            _ctx = ctx;
            _userManager = userMgr;
            _roleManager = roleMgr;
        }

        //GET api/users
        [HttpGet]
        public IEnumerable<ApplicationUser> Get()
        {
            var res = HttpContext.User.Claims;
            var sdf = HttpContext.Request.Headers;
            var users =  _repo.GetAllProfiles();
            return users;
        }

        //GET api/users/id
        
        [HttpGet("{id}", Name = "GetContact")]
        public async Task<ViewApplicationUser> GetUser(string id)
        {
            var  user =  _repo.GetProfile(id);

            var valueUser = new ViewApplicationUser
            {
                Id = user.ApplicationUserId,
                UserName = user.IdentityOfUser.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Patronymic = user.Patronymic,
                Gender =user.Gender,
                UniqId =user.UniqId,
                Age = user.Age,
                Email = user.IdentityOfUser.Email,
                Belongings =user.Belongings              
                
            };
        
            IList<string> res = await _userManager.GetRolesAsync(user.IdentityOfUser);
            valueUser.Roles = res.ToArray();
            return valueUser;
        }

        // GET api/contacts/?=
        
        [HttpGet("search")]
        public IEnumerable<ApplicationUser> Search(string q)
        {
            return _ctx.AppUsers.
            Where((c) => c.LastName.ToLower().Contains(q.ToLower()) || c.FirstName.ToLower().Contains(q.ToLower())).
            OrderBy((o) => o.LastName);
        }

        //Post api/users
       
        [HttpPost]
        public async Task<IActionResult> Create(ViewApplicationUser vm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new AppIdentityUser
            {
                UserName = vm.UserName,
                Email = vm.Email,

            };
            Guid gu = Guid.NewGuid();
            string TempPass = Convert.ToBase64String(gu.ToByteArray());
            TempPass = TempPass.Replace("=", "");
            TempPass = TempPass.Replace("+", "");
            var appUser = new ApplicationUser
            {
              
                AppIdentityUserId =user.Id,
                FirstName = vm.FirstName,
                LastName = vm.LastName,
                Patronymic = vm.Patronymic,
                Gender = vm.Gender,
                Age = vm.Age,
                UniqId = vm.UniqId,
                
            };
       
            IdentityResult result = await _userManager.CreateAsync(user, TempPass);
            await _userManager.AddToRolesAsync(user, vm.Roles);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
                
            }

            var profile = await _ctx.AppUsers.AddAsync(appUser);
            await _ctx.SaveChangesAsync();
            return Ok();
        }

        // PUT api/contacts/5
       
        [HttpPut("{id}")]
        public  async Task<IActionResult> Edit(string id, [FromBody]ViewApplicationUser vm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var currentIdentity = _repo.GetIdentity(id);

            var differencesIdentity = DiffUpdateProperties<AppIdentityUser>(currentIdentity, vm);
            var differencesProfile = DiffUpdateProperties<ApplicationUser>(currentIdentity.AppUser, vm);

            IList<string> roles = await _userManager.GetRolesAsync(currentIdentity);
            List<string> arrayToAction = new List<string>();

            if (roles.Count < vm.Roles.Count)
            {
                for (int i = 0; i < vm.Roles.Count; i++)
                {
                    if (!roles.Contains(vm.Roles[i]))
                    {
                        arrayToAction.Add(vm.Roles[i]);
                    }
                }
                await _userManager.AddToRolesAsync(currentIdentity, arrayToAction);
            }
            else if(roles.Count > vm.Roles.Count)
            {
                for (int i = 0; i < roles.Count; i++)
                {
                    if (!vm.Roles.Contains(roles[i]))
                    {
                        arrayToAction.Add(vm.Roles[i]);
                    }
                }
                await _userManager.RemoveFromRolesAsync(currentIdentity
                    , arrayToAction);
            }
            _repo.UpdateProfile(differencesProfile);
            _repo.UpdateIdentity(differencesIdentity);
            await _repo.SaveChangesAsync();
            return Ok();
        }

        // DELETE api/contacts/5
       
        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(string id)
        {
            _repo.RemoveUser(id);
            await _repo.SaveChangesAsync();
            return Ok();
        }


        public T DiffUpdateProperties<T>(T current, object input) 
        {
            Type type = current.GetType();
           
            foreach (PropertyInfo p in type.GetProperties())
            {
                object currentValue = p.GetValue(current, null);
                
                if (input.GetType().GetProperty(p.Name) != null && !p.Name.Contains("Id"))
                {
                    object inputValue = input.GetType().GetProperty(p.Name).GetValue(input, null);

                    if (inputValue != null && !currentValue.Equals(inputValue))
                    {
                        p.SetValue(current, inputValue);
                    }
                    else
                    {
                        p.SetValue(current, currentValue);
                    }
                }
            }

            return current;
        }

        public T DiffCreateProperties<T>(T current, object input)where T: new()
        {
            Type type = current.GetType();
            var obj = new T();
            foreach (PropertyInfo p in type.GetProperties())
            {
                object currentValue = p.GetValue(current, null);

                if (input.GetType().GetProperty(p.Name) != null && !p.Name.Contains("Id"))
                {
                    object inputValue = input.GetType().GetProperty(p.Name).GetValue(input, null);

                    if (!currentValue.Equals(inputValue))
                    {
                        p.SetValue(obj, inputValue);
                    }
                    else
                    {
                        p.SetValue(obj, currentValue);
                    }
                }
            }

            return current;
        }

    }

  
}

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using School_Spa.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School_Spa.Data
{
    public class RepositoryUsers:IRepositoryUsers
    {
        private readonly AppDbContext _ctx;
        public RepositoryUsers(AppDbContext ctx)
        {
            _ctx = ctx;
        }
      
        public List<ApplicationUser> GetAllProfiles()
        {

            return _ctx.AppUsers.ToList();
        }
        public List<AppIdentityUser> GetAllIdentities()
        {
            return _ctx.Users.ToList();
        }
      
        public AppIdentityUser GetIdentity(string id)
        {
            return _ctx.Users.Include(i=>i.AppUser).FirstOrDefault(u => u.AppUser.ApplicationUserId == id);
        }

        public ApplicationUser GetProfile(string id)
        {
            var res = _ctx.AppUsers.Include(i => i.IdentityOfUser).FirstOrDefault(p => p.ApplicationUserId == id);
            return res;
        }
      
        public void UpdateProfile(ApplicationUser ApplicationUser)
        {
            _ctx.AppUsers.Update(ApplicationUser);

        }
        public void UpdateIdentity(AppIdentityUser IdentityUser)
        {
            _ctx.Users.Update(IdentityUser);
        }
        
        public void RemoveUser(string id)
        {
            _ctx.Users.Remove(GetIdentity(id));
        }
        public async Task<bool> SaveChangesAsync()
        {
            if (await _ctx.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }

    }
}


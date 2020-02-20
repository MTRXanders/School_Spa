using School_Spa.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School_Spa.Data
{
    public interface IRepositoryUsers
    {
        List<ApplicationUser> GetAllProfiles();
        List<AppIdentityUser> GetAllIdentities();

        AppIdentityUser GetIdentity(string id);

        ApplicationUser GetProfile(string id);
       
        void UpdateProfile(ApplicationUser ApplicationUser);
        void UpdateIdentity(AppIdentityUser IdentityUser);
        void RemoveUser(string id);
        Task<bool> SaveChangesAsync();
    }
}

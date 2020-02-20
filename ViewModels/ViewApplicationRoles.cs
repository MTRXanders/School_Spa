using School_Spa.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace School_Spa.ViewModels
{
    public class ViewApplicationRoles
    {
        [Required]
        public string Name;
        public IEnumerable<ApplicationRole> roles;
    }
}

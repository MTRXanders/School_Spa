using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace School_Spa.Models
{
    public class ApplicationRole: IdentityRole
    {
       
        [Required]
        public override string Name { get; set; }
    }
}

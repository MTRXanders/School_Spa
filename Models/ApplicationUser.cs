using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace School_Spa.Models
{
    public class ApplicationUser
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ApplicationUserId { get; set; }

        [Required]
        [MaxLength(40)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(40)]
        public string LastName { get; set; }

        [MaxLength(60)]
        public string Patronymic { get; set; }

        [Required]
        public string Gender { get; set; }

        [StringLength(16, MinimumLength = 6)]
        public string UniqId { get; set; }

        public int Age { get; set; }

        public string Belongings { get; set; }
        
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Created { get; set; }

        [ForeignKey("IdentityOfUser")]
        public string AppIdentityUserId { get; set; }

        public AppIdentityUser IdentityOfUser { get; set; }

        public IEnumerable<TestsResult> TestsResults { get; set; }

    }
}

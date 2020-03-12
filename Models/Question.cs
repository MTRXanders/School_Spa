using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace School_Spa.Models
{
    public class Question
    {
        [Key]
        public string Id { get; set; }
        public string Value { get; set; }
        public string Options { get; set; }
        public string Goal { get; set; }

        public Test Test { get; set; }
        public string TestId { get; set; }
    }
}

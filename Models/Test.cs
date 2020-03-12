using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School_Spa.Models
{
    public class Test
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Theme { get; set; }
        public List<Question> Questions { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class ApplicationUser
    { 
        [MaxLength(30)]
        public string Name { get; set; }
    }
}
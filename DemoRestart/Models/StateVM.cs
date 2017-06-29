using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DemoRestart.Models
{
    public class StateVM
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "State Name is required")]
        public string Name { get; set; }
    }
}
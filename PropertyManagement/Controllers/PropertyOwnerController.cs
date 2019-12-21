using Microsoft.AspNetCore.Mvc;
using PropertyManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyManagement.Controllers
{
   
    public class PropertyOwnerController : Controller
    {
        
       
        public ActionResult Add([FromBody]PropertyOwner Owner)
        {
            int i = 0;
            return Ok();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using PropertyManagement.Data;
using PropertyManagement.Helpers;
using PropertyManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyManagement.Controllers
{
   
    public class PropertyOwnerController : Controller
    {
        private readonly IOwnerRepository _authRepo;

        public PropertyOwnerController(IOwnerRepository repo)
        {
            _authRepo = repo;
        }


        [HttpGet]
        public async Task<IActionResult> GetAsync([FromQuery]UserParam userParams)
        {
            var task = await _authRepo.GetProperties();
            return Json(task);
        }


        public async Task<ActionResult> Add([FromBody]PropertyOwner Owner)
        {
            var task = await _authRepo.AddOwner(Owner);
            return Ok();
        }
    }
}

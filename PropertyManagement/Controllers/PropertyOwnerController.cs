using Microsoft.AspNetCore.Mvc;
using PropertyManagement.Data;
using PropertyManagement.Extensions;
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


    
        public async Task<IActionResult> GetAsync([FromQuery]UserParam userParams)
        {
            var pagedList = await _authRepo.GetProperties(userParams);
            Response.AddPagination(pagedList.CurrentPage, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
            return Json(pagedList);
        }


        public async Task<ActionResult> Add([FromBody]PropertyOwner Owner)
        {
            var task = await _authRepo.AddOwner(Owner);
            return Ok();
        }
    }
}

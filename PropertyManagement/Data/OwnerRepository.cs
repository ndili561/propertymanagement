using DatingApp.API.Helpers;
using Microsoft.EntityFrameworkCore;
using PropertyManagement.Helpers;
using PropertyManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyManagement.Data
{
    public class OwnerRepository : IOwnerRepository
    {
        private readonly DataContext _db;

        public OwnerRepository(DataContext db)
        {
            _db = db;
        }
        public async Task<PropertyOwner> AddOwner(PropertyOwner owner)
        {
           var t = await _db.Properties.AddAsync(owner);
           await _db.SaveChangesAsync();
           return new PropertyOwner();
        }

        public async Task<PagedList<PropertyOwner>> GetProperties(UserParam userparam)
        {
            var task = _db.Properties.Where(s => s.LastName != null).AsQueryable();
            var pagedList = await PagedList<PropertyOwner>.CreateAsync(task, userparam.PageNumber, userparam.PageSize);

            return pagedList;
        }
    }
}

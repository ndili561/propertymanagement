using Microsoft.EntityFrameworkCore;
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

        public async Task<List<PropertyOwner>> GetProperties()
        {
            List<PropertyOwner> task = await _db.Properties.Select(s=>s).ToListAsync();
            return task;
        }
    }
}

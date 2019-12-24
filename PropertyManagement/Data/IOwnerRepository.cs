using DatingApp.API.Helpers;
using PropertyManagement.Helpers;
using PropertyManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyManagement.Data
{
    public interface IOwnerRepository
    {
        Task<PropertyOwner> AddOwner(PropertyOwner owner);
        Task<PagedList<PropertyOwner>> GetProperties(UserParam param);
    }
}



using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Repositories
{
    public class PermissionRequestsRepository
    {
        private readonly PermissionRequestsDbContext _context;

        public PermissionRequestsRepository(PermissionRequestsDbContext context)
        {
            _context = context;
        }

        public async Task<List<PermissionRequest>> GetAllPermissionRequestsAsync()
        {
            try
            {
                return await _context.PermissionRequests.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve permission requests", ex);
            }
        }

        public async Task<PermissionRequest> GetPermissionRequestByIdAsync(int id)
        {
            try
            {
                return await _context.PermissionRequests.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to retrieve permission request by id", ex);
            }
        }

        public async Task CreatePermissionRequestAsync(PermissionRequest permissionRequest)
        {
            try
            {
                if (permissionRequest == null)
                {
                    throw new Exception("Permission request cannot be null");
                }

                await _context.PermissionRequests.AddAsync(permissionRequest);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to create permission request", ex);
            }
        }

        public async Task UpdatePermissionRequestAsync(PermissionRequest permissionRequest)
        {
            try
            {
                if (permissionRequest == null)
                {
                    throw new Exception("Permission request cannot be null");
                }

                _context.PermissionRequests.Update(permissionRequest);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to update permission request", ex);
            }
        }

        public async Task DeletePermissionRequestAsync(int id)
        {
            try
            {
                var permissionRequest = await GetPermissionRequestByIdAsync(id);
                if (permissionRequest != null)
                {
                    _context.PermissionRequests.Remove(permissionRequest);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to delete permission request", ex);
            }
        }
    }
}
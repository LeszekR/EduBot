using EduApi.DAL.Core;
using EduApi.DAL.Interfaces;
using System;

namespace EduApi.DAL
{
    public class ModuleRepository : Repository<edumodule>, IModuleRepository
    {
        private edumaticEntities _context;

        public ModuleRepository(edumaticEntities context) : base(context) {
            _context = context;
        }
    }
}
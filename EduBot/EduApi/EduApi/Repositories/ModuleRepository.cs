using EduApi.DAL.Core;
using EduApi.DAL.Interfaces;
using EduApi.DTO;
using System;

namespace EduApi.DAL
{
    public class ModuleRepository : Repository<edumodule>, IModuleRepository
    {
        private edumaticEntities _context;

        public ModuleRepository(edumaticEntities context) : base(context) {
            _context = context;
        }

        public void SetNewValues(ModuleDTO source, edumodule result) {
            _context.Entry(result).CurrentValues.SetValues(source);
            _context.SaveChanges();
        }
    }
}
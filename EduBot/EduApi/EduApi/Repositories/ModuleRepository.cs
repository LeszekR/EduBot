using EduApi.DAL.Core;
using EduApi.DAL.Interfaces;
using EduApi.DTO;
using System.Collections.Generic;
using System.Linq;

namespace EduApi.DAL {
    public class ModuleRepository : Repository<edumodule>, IModuleRepository
    {
        private edumaticEntities _context;


        // CONSTRUCTOR
        // =============================================================================================
        public ModuleRepository(edumaticEntities context) : base(context) {
            _context = context;
        }


        // PUBLIC
        // =============================================================================================
        public void SetNewValues(ModuleDTO source, edumodule result) {
            _context.Entry(result).CurrentValues.SetValues(source);
            _context.SaveChanges();
        }

        // ---------------------------------------------------------------------------------------------
        public List<edumodule> SelectChildren(int id_grupy) {
            return _context.edumodule.Where(mod => mod.id_group == id_grupy).ToList();
        }
    }
}
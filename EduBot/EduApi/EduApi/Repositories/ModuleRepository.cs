using EduApi.DAL.Core;
using EduApi.DAL.Interfaces;
using EduApi.DTO;

namespace EduApi.DAL {


    // =================================================================================================
    public class ModuleRepository : Repository<edumodule>, IModuleRepository {


        // CONSTRUCTOR
        // =============================================================================================
        public ModuleRepository(edumaticEntities context) : base(context) {}


        // PUBLIC
        // =============================================================================================
        public void SetNewValues(ModuleDTO source, edumodule result) {
            _context.Entry(result).CurrentValues.SetValues(source);
            _context.SaveChanges();
        }
    }
}
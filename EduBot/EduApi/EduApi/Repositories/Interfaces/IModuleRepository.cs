using EduApi.DAL.Core;
using EduApi.DTO;

namespace EduApi.DAL.Interfaces
{
    public interface IModuleRepository : IRepository<edumodule>
    {
        /* Kopiuje dane z ModuleDTO do edumodule pobranego z bazy
         * i zapisuje zmiany w bazie. */
        void SetNewValues(ModuleDTO source, edumodule result);
    }
}

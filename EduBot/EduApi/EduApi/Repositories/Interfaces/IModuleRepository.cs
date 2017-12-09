using EduApi.DAL.Core;
using EduApi.DTO;
using System.Collections.Generic;

namespace EduApi.DAL.Interfaces
{

    // =================================================================================================
        public interface IModuleRepository : IRepository<edumodule>
    {
        // ---------------------------------------------------------------------------------------------
        /* Zwraca listę id wszystkich modułów o wskazanym stopniu trudności - nie posortowaną. */
        List<edumodule> SelectDifficultyGroup(string difficulty);

        // ---------------------------------------------------------------------------------------------
        /* Kopiuje dane z ModuleDTO do edumodule pobranego z bazy i zapisuje zmiany w bazie. */
        void SetNewValues(ModuleDTO source, edumodule result);

        // ---------------------------------------------------------------------------------------------
        /* Pobiera wszystkie moduły, które należą do grupy o podanym id_grupy */
        List<edumodule> SelectChildren(int id_grupy);
    }
}

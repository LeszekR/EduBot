using EduApi.DAL.Core;
using EduApi.DTO;
using System.Collections.Generic;

namespace EduApi.DAL.Interfaces
{

    // =================================================================================================
        public interface IModuleRepository : IRepository<edumodule>
    {
        //// ---------------------------------------------------------------------------------------------
        ///* Pobiera moduły wysłane dotychczas danemu użytkownikowi. */
        //List<edumodule> ModulesOfUser(int userId);

        //// ---------------------------------------------------------------------------------------------
        ///* 1. Pobiera wszystkie moduły, które należą do grupy o podanym id_grupy 
        // * 2. sortuje wg pozycji w grupie (kolejności)
        // */
        //List<edumodule> SelectChildren(int? id_grupy);

        // ---------------------------------------------------------------------------------------------
        /* Kopiuje dane z ModuleDTO do edumodule pobranego z bazy i zapisuje zmiany w bazie. */
        void SetNewValues(ModuleDTO source, edumodule result);
    }
}

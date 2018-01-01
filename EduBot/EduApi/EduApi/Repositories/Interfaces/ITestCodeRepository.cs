using EduApi.DAL.Core;
using EduApi.Dto;
using System.Collections.Generic;

namespace EduApi.Repositories.Interfaces {

    // =================================================================================================
    public interface ITestCodeRepository : IRepository<test_code>{

        // ---------------------------------------------------------------------------------------------
        /* Kopiuje dane z TestCodeDTO do edumodule pobranego z bazy i zapisuje zmiany w bazie. */
        void SetNewValues(TestCodeDTO source, test_code result);

        // ---------------------------------------------------------------------------------------------
        /* Pobiera wszystkie pytania przypisane do modułu o wskazanym id */
        List<test_code> SelectCodesForModule(int module_id);
    }
}
using EduApi.DAL.Core;
using EduApi.Dto;

namespace EduApi.Repositories.Interfaces {

    // =================================================================================================
    public interface ITestCodeRepository : IRepository<test_code>{

        // ---------------------------------------------------------------------------------------------
        /* Kopiuje dane z TestCodeDTO do edumodule pobranego z bazy i zapisuje zmiany w bazie. */
        void SetNewValues(TestCodeDTO source, test_code result);
    }
}
using EduApi.DAL.Core;
using EduApi.Dto;
using System.Collections.Generic;

namespace EduApi.Repositories.Interfaces {

    // =================================================================================================
    public interface ITestQuestionRepository : IRepository<test_question>{

        // ---------------------------------------------------------------------------------------------
        /* Kopiuje dane z TestQuestionDTO do edumodule pobranego z bazy i zapisuje zmiany w bazie. */
        void SetNewValues(TestQuestionDTO source, test_question result);
    }
}
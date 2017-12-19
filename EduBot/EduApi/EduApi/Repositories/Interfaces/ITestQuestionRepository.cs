using EduApi.DAL.Core;
using EduApi.Dto;
using System.Collections.Generic;

namespace EduApi.Repositories.Interfaces {

    // =================================================================================================
    public interface ITestQuestionRepository : IRepository<test_question>{
    
        // ---------------------------------------------------------------------------------------------
        /* Kopiuje dane z TestQuestionDTO do edumodule pobranego z bazy i zapisuje zmiany w bazie. */
        void SetNewValues(TestQuestionDTO source, test_question result);

        // ---------------------------------------------------------------------------------------------
        /* Pobiera wszystkie pytania przypisane do modułu o wskazanym id */
        List<test_question> SelectQuestionsForModule(int module_id);

        //// ---------------------------------------------------------------------------------------------
        ///* Pobiera wszystkie pytania przypisane do modułu o wskazanym id, 
        // * a jeżeli to jest moduł złożony to pobiera wszystkie pytania jego dzieci. */
        //List<test_question> SelectQuestionsForModule(ModuleDTO module);
    }
}
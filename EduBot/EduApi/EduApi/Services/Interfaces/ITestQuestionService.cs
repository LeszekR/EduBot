using EduApi.Dto;
using System.Collections.Generic;

namespace EduApi.Services.Interfaces {

    // =================================================================================================
    interface ITestQuestionService {

        // ---------------------------------------------------------------------------------------------
        /* Pobiera z bazy wszystkie pytania dla danego modułu. */
        List<test_question> SelectQuestionsForModule(int module_id);

        // ---------------------------------------------------------------------------------------------
        TestQuestionDTO UpsertQuestion(TestQuestionDTO questionReceived);

        // ---------------------------------------------------------------------------------------------
        void DeleteQuestion(int id);
    }
}

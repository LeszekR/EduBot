using EduApi.Dto;
using System.Collections.Generic;

namespace EduApi.Services.Interfaces {

    // =================================================================================================
    public interface ITestQuestionService {


        // MOCK
        // =============================================================================================
        // =============================================================================================

        /* 1. Sprawdza odpowiedzi udzielone przez użytkownika w teście.
         * 2. Zapisuje wyniki tych pytań dla tego użytkownika w bazie.
         * 3. Odsyła tablicę tych samych pytań, w zmiennej answer_id umieszczając
         *     0 : odpowiedź nieprawidłowa,
         *     1 : odpowiedź prawidłowa.
         */
        List<TestQuestionAnswDTO> VerifyClosedTest(TestQuestionAnswDTO[] answers, int userId);

        // ---------------------------------------------------------------------------------------------
        /* Pobiera z bazy wszystkie pytania dla danego modułu. */
        List<test_question> SelectQuestionsForModule(int module_id);

        // ---------------------------------------------------------------------------------------------
        TestQuestionDTO UpsertQuestion(TestQuestionDTO questionReceived);

        // ---------------------------------------------------------------------------------------------
        void DeleteQuestion(int id);

        // ---------------------------------------------------------------------------------------------
        test_question GetQuestionEntity(int id);
    }
}

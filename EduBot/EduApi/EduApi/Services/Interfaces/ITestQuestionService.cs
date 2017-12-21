using EduApi.Dto;
using System.Collections.Generic;

namespace EduApi.Services.Interfaces {

    // =================================================================================================
    public interface ITestQuestionService {


        // MOCK
        // =============================================================================================
        // =============================================================================================

        /* 1. Oblicza na jaki procent pytań testowych użytkownik odpowiedział prawidłowo za pierwszym razem
         *    (użytkownik  może dowolnie poprawiać odpowiedzi, ale pierwsza odpowiedź jest zapamiętywana;
         *    to pozwala na ocenę trudności, jaką sprawia mu uczenie się tego materiału).
         * 2. Liczbą pytań, która musi zostać wzięta pod uwagę steruje parametr programu
         *    w Web.config: "nLastAnswersForDiffTreshold".
         * 3. Jeżeli użytkownik nie odpowiedział jeszcze na tę liczbę pytań - metoda zwraca -1 i jej wynik
         *    jest pomijany przy decyzji o poziomie trudności kolejnego modułu.
         */
        int GetRecentResults(int userId);

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

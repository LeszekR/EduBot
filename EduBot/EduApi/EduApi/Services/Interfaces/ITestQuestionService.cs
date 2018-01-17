using EduApi.Dto;

namespace EduApi.Services.Interfaces {

    // =================================================================================================
    public interface ITestQuestionService {

        // ---------------------------------------------------------------------------------------------
        TestQuestionDTO UpsertQuestion(TestQuestionDTO questionReceived);

        // ---------------------------------------------------------------------------------------------
        void DeleteQuestion(int id);

        // ---------------------------------------------------------------------------------------------
        test_question GetQuestionEntity(int id);
    }
}

using EduApi.Dto;

namespace EduApi.Services.Interfaces {

    // =================================================================================================
    public interface IUserQuestionService {

        // ---------------------------------------------------------------------------------------------
        user_question UpsertUserQuestion(user_question newUserQuestion);
    }
}

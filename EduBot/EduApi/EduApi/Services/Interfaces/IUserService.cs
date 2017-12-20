using EduApi.DTO;
using System.Collections.Generic;

namespace EduApi.Services.Interfaces {

    public interface IUserService {

        // =============================================================================================
        // TODO: po testach usunąc - MOCK
        void ClearModuleHistory(int userId);
        void ClearQuestionHistory(int userId);
        // =============================================================================================

        //List<user_question> GetQuestionsOfUser(int userId);
        void SaveChanges();
        user GetUserEntity(int id);
        IList<UserDTO> GetUsers();
        int SaveUser(UserDTO user);
        bool DeleteUser(int id);
        UserDTO Authenticate(string login, string password);
        void UpdateUserRole(UserDTO user);
    }
}

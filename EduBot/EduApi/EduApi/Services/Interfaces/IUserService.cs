using EduApi.DTO;
using System.Collections.Generic;

namespace EduApi.Services.Interfaces {

    public interface IUserService {

        // =============================================================================================
        // TODO: po testach usunąc - MOCK
        void ClearModuleHistory(int userId);
        // =============================================================================================

        //List<user_question> GetQuestionsOfUser(int userId);
        void SaveChanges();
        user GetUserEntity(int id);
        //int? GetLastModuleId(int userId);
        IList<UserDTO> GetUsers();
        int SaveUser(UserDTO user);
        bool DeleteUser(int id);
        UserDTO Authenticate(string login, string password);
        void UpdateUserRole(UserDTO user);
    }
}

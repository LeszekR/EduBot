using EduApi.Dto;
using EduApi.DTO;
using System.Collections.Generic;

namespace EduApi.Services.Interfaces {

    public interface IUserService {

        void ClearModuleHistory(int userId);
        void ClearQuestionHistory(int userId);

        void SaveChanges();
        user GetUserEntity(int id);
        IList<UserDTO> GetUsers();
        int SaveUser(UserDTO user);
        bool DeleteUser(int id);
        void UpdateUserRole(UserDTO user);
    }
}

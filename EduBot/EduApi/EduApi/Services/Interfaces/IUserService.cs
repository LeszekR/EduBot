using EduApi.DTO;
using System.Collections.Generic;

namespace EduApi.Services.Interfaces
{
    public interface IUserService
    {
        IList<UserDTO> GetUsers();
        int SaveUser(UserDTO user);
        bool DeleteUser(int id);
        UserDTO Authenticate(string login, string password);
    }
}

using EduApi.DTO;
using System.Collections.Generic;

namespace EduApi.Services.Interfaces
{
    public interface IUserService
    {
        IList<UserDTO> GetUsers();
        UserDTO Authenticate(string login, string password);
    }
}

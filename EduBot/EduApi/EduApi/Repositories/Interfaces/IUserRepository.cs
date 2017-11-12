using EduApi.DAL.Core;
using EduApi.DTO;

namespace EduApi.DAL.Interfaces
{
    public interface IUserRepository : IRepository<user>
    {
        UserDTO Authenticate(string login, string password);
    }
}

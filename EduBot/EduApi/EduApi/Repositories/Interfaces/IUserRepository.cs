using EduApi.DAL.Core;
using EduApi.DTO;

namespace EduApi.DAL.Interfaces
{
    public interface IUserRepository : IRepository<user>
    {
        UserDTO LogUser(string login, string password);
    }
}

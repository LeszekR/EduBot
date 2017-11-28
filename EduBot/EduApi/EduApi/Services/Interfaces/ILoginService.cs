using EduApi.DTO;

namespace EduApi.Services.Interfaces {

    public interface ILoginService {
        UserDTO Login(CredentialsDTO cred);
    }
}

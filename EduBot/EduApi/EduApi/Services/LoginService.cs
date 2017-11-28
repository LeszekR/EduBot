using EduApi.DAL.Interfaces;
using EduApi.DTO;
using EduApi.Services.Interfaces;

namespace EduApi.Services {

    public class LoginService : ILoginService {

        private readonly IUserRepository _userRepository;

        #region Constructor
        public LoginService(IUserRepository moduleRepository) {
            _userRepository = moduleRepository;
        }
        #endregion


        // ---------------------------------------------------------------------------------------------
        public UserDTO Login(CredentialsDTO cred) {
            return _userRepository.Authenticate(cred.Login, cred.Password);
        }
    }
}
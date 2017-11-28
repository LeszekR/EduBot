using System.Linq;
using System.Net;
using System.Web.Http;
using EduApi.DTO;
using System.Web.Http.Cors;
using EduApi.Dto.Mappers;
using EduApi.Services.Interfaces;

namespace EduApi.Controllers {


    // -------------------------------------------------------------------------------------------------
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*", SupportsCredentials = true)]
    public class LoginController : ApiController {

        private readonly ILoginService _loginService;

        #region Constructor
        public LoginController(ILoginService loginService) {
            _loginService = loginService;
        }
        #endregion


        // ---------------------------------------------------------------------------------------------
        [HttpPost]
        public IHttpActionResult Login([FromBody]CredentialsDTO cred) {

            UserDTO userLog = _loginService.Login(cred);

            if (userLog == null)
                return StatusCode(HttpStatusCode.Unauthorized);
            else
                return Ok(userLog);
        }
    }
}
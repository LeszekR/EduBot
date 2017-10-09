using System.Linq;
using System.Net;
using System.Web.Http;
using EduApi.DTO;
using EduApi.Models;
using System.Web.Http.Cors;



namespace EduApi.Controllers {


    // -------------------------------------------------------------------------------------------------
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*", SupportsCredentials = true)]
    public class LoginController : ApiController {


        [HttpPost]
        public IHttpActionResult Login([FromBody]Credentials cred) {

            var login = cred.Login;
            var passw = cred.Password;
            user userLog = null;

            using (edumaticEntities baza = new edumaticEntities()) {
                userLog = (from obiekt
                        in baza.user
                           where obiekt.login == login && obiekt.password == passw
                           select obiekt).FirstOrDefault();
            }

            if (userLog == null)
                return StatusCode(HttpStatusCode.Unauthorized);
            else
                return Ok(new UserDTO(userLog));
        }
    }
}
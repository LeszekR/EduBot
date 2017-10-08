using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using EduApi.DTO;
using EduApi.Models;
using System.Web.Http.Cors;

namespace EduApi.Controllers {

    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
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

            // jeżeli niepowodzenie logowania - utawić ręcznie status 400... bad credentials
            if (userLog == null)
                HttpContext.Current.Response.StatusCode = 401;

            return Ok(userLog);
        }
    }
}
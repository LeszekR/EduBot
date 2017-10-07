using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using EduApi.DTO;
using EduApi.Models;

namespace EduApi.Controllers {

    public class LoginController : ApiController {

        // POST api/<controller>
        [HttpPost]
        public string Login([FromBody]Credentials cred) {

            var login = cred.Login;
            var passw = cred.Password;

            using (edumaticEntities baza = new edumaticEntities()) {
                var loginOk = baza.
            }

            // jeżeli niepowodzenie logowania - utawić ręcznie status 400... bad credentials
            // jeżeli powodzenie - albo tylko odsesłać treść albo dodać też nagłówek 200

            return "login rejected";
        }
    }
}
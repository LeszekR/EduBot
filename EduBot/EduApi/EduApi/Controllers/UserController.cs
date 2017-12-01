﻿using EduApi.DTO;
using EduApi.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EduApi.Controllers {


    // =================================================================================================
    [RoutePrefix("api/user")]
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*", SupportsCredentials = true)]
    public class UserController : ApiController {

        private readonly IUserService _userService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public UserController(IUserService userService) {
            _userService = userService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        [Route(template: "auth")]
        [HttpPost]
        public IHttpActionResult Authenticate([FromBody]CredentialsDTO cred) {

            UserDTO userLog = _userService.Authenticate(cred.Login, cred.Password);
            if (userLog == null)
                return StatusCode(HttpStatusCode.Unauthorized);

            //return Ok(userLog);

            string sessionId = Guid.NewGuid().ToString();
            var cookie = new CookieHeaderValue("session-id", sessionId) {
                Expires = DateTimeOffset.Now.AddDays(1),
                Domain = Request.RequestUri.Host,
                Path = "/"
            };

            //Create response as usual
            var response = Request.CreateResponse(HttpStatusCode.OK, userLog);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            response.Headers.AddCookies(new[] { cookie });

            //Use ResponseMessage to convert it to IHttpActionResult
            return ResponseMessage(response);
        }

        // ---------------------------------------------------------------------------------------------
        [Route("")]
        [HttpGet]
        public IHttpActionResult GetUsers() {
            return Ok(_userService.GetUsers());
        }

        // ---------------------------------------------------------------------------------------------
        [Route("")]
        [HttpPost]
        public IHttpActionResult CreateUser(UserDTO user) {
            return Ok(_userService.SaveUser(user));
        }

        // ---------------------------------------------------------------------------------------------
        [Route("role")]
        [HttpPut]
        public IHttpActionResult UpdateUserRole(UserDTO user) {
            _userService.UpdateUserRole(user);
            return Ok();
        }

        // ---------------------------------------------------------------------------------------------
        [Route("{id}")]
        [HttpDelete]
        public IHttpActionResult Delete(int id) {
            return Ok();
        }
    }
}

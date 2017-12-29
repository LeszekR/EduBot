﻿using EduApi.DTO;
using EduApi.Services.Interfaces;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EduApi.Controllers {


    // =================================================================================================
    [RoutePrefix("api/user")]
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

            return Ok(userLog);
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

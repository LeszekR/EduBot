using EduApi.DTO;
using EduApi.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EduApi.Controllers {

    [RoutePrefix("api/user")]
    public class UserController : ApiController {
        private readonly IUserService _userService;

        #region Constructor
        public UserController(IUserService userService) {
            _userService = userService;
        }
        #endregion

        [Route("")]
        [HttpGet]
        public IHttpActionResult GetUsers() {
            return Ok(_userService.GetUsers());
        }

        [Route("auth")]
        [HttpGet]
        public IHttpActionResult Authenticate() {
            var user = _userService.Authenticate("aa", "aa");
            if (user == null)
                return BadRequest();
            return Ok(user);
        }

        [Route("")]
        [HttpPost]
        public IHttpActionResult CreateUser(UserDTO user)
        {
            return Ok(_userService.SaveUser(user));
        }

        [Route("role")]
        [HttpPut]
        public IHttpActionResult UpdateUserRole(UserDTO user)
        {
            _userService.UpdateUserRole(user);
            return Ok();
        }
        
        [HttpDelete]
        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            return Ok();
        }
    }
}

using EduApi.DTO;
using EduApi.Services.Interfaces;
using System.Web.Http;

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

        // ---------------------------------------------------------------------------------------------
        [Route("")]
        [HttpGet]
        public IHttpActionResult GetUsers() {
            return Ok(_userService.GetUsers());
        }

        // ---------------------------------------------------------------------------------------------
        [Route("")]
        [HttpPost]
        [OverrideAuthorization]
        public IHttpActionResult CreateUser(UserDTO user) {
            int id = _userService.SaveUser(user);
            if (id < 0) {
                return BadRequest("User exists");
            }
            return Ok(id);
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

using EduApi.DTO;
using System.Web.Http;

namespace EduApi.Controllers {

    [RoutePrefix("api/test")]
    public class TestController : ApiController {

        [Route("")]
        [HttpGet]
        public IHttpActionResult GetData() {
            return Ok("Udało się!");
        }

        [Route("")]
        [HttpPost]
        public IHttpActionResult PostData(TestDTO user) {
            return Ok("Udało się!");
        }
    }
}

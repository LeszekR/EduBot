using System.Web.Http;

namespace EduApi.Controllers {

    public class ServerController : ApiController {

        [HttpGet]
        public IHttpActionResult Index() {
            return Ok("<h3>Serwer Edu Api pracuje.</h3>");
        }
    }
}
using System.Web.Http;

namespace EduApi.Controllers {
    public class ServerController : ApiController
    {
        // GET: EduBotServer
        [HttpGet]
        //public ActionResult Index() { 
        public IHttpActionResult Index() {
            return Ok("<h3>Serwer Edu Api pracuje.</h3>");
        }
    }
}
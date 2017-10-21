using EduApi.DTO;
using System.Web.Http;

namespace EduApi.Controllers {
    public class ModuleController : ApiController {
        [Route("")]
        [HttpGet]
        public IHttpActionResult GetData() {
            return Ok("Udało się!");
        }

        [Route("")]
        [HttpPost]
        public IHttpActionResult UpsertModule([FromBody]ModuleDTO edumodule) {


            var id = edumodule.id;
            edumodule module;

            using (edumaticEntities baza = new edumaticEntities()) {

                if (id == 0) {
                    module = new edumodule {
                        id_group = edumodule.id_group,
                        difficulty = edumodule.difficulty,
                        title = edumodule.title,
                        content = edumodule.content,
                        example = edumodule.example,
                        test_type = edumodule.test_type,
                        test_task = edumodule.test_task,
                        test_answer = edumodule.test_answer
                    };

                    baza.edumodule.Add(module);
                }
                else {
                    module = (
                        from ed in baza.edumodule
                        where ed.id == id
                        select ed).First();
                }
                baza.SaveChanges();
            }

            //if (userLog == null)
            //    return StatusCode(HttpStatusCode.Unauthorized);
            //else
            return Ok(edumodule);
        }
    }
}
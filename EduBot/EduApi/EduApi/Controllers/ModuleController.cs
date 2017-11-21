using EduApi.DTO;
using System.Web.Http;
using System.Linq;
using EduApi.DAL;
using System.Web.Http.Cors;
using System.Collections.Generic;
using EduApi.Dto.Mappers;

namespace EduApi.Controllers {


    // -------------------------------------------------------------------------------------------------
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "GET,POST", SupportsCredentials = true)]
    public class ModuleController : ApiController {


        //// ---------------------------------------------------------------------------------------------
        //public IHttpActionResult GetLastIdx() {
        //    int? index = 0;

        //    using (edumaticEntities db = new edumaticEntities()) {
        //        index = db.edumodule.Max(module => (int?)module.id) ?? 0;
        //    }
        //    return Ok(index);
        //}


        // ---------------------------------------------------------------------------------------------
        public IHttpActionResult GetSimpleModules() {

            //IQueryable<edumodule> modules;
            List<ModuleDTO> modules;

            using (edumaticEntities db = new edumaticEntities()) {
                //modules = db.edumodule.Select(ed => ModuleMappper.GetSimpleDTO(ed)).ToList();
                modules = (from ed in db.edumodule select ed).GetSimpleDTOList();
            }
            return Ok(modules);
            //return Ok("próba");
        }


        // ---------------------------------------------------------------------------------------------
        public IHttpActionResult GetModule([FromUri]int moduleId) {

            edumodule module;

            using (edumaticEntities db = new edumaticEntities()) {
                module = (
                    from ed in db.edumodule
                    where ed.id == moduleId
                    select ed)
                    .FirstOrDefault();
            }
            return Ok(module);
        }


        // ---------------------------------------------------------------------------------------------
        [HttpPost]
        public IHttpActionResult UpsertModule([FromBody]ModuleDTO moduleReceived) {

            //var id = moduleReceived.id;
            //edumodule module;

            //using (edumaticEntities db = new edumaticEntities()) {

            //    if (id == 0)
            //        module = new edumodule();

            //    else 
            //        module = (
            //            from ed in db.edumodule
            //            where ed.id == id
            //            select ed)
            //            .First();

            //    module.id_group = moduleReceived.id_group;
            //    module.difficulty = moduleReceived.difficulty;
            //    module.title = moduleReceived.title;
            //    module.content = moduleReceived.content;
            //    module.example = moduleReceived.example;
            //    module.test_type = moduleReceived.test_type;
            //    module.test_task = moduleReceived.test_task;
            //    module.test_answer = moduleReceived.test_answer;

            //    new ModuleRepository(db).Add(module);
            //}

            ////if (userLog == null)
            ////    return StatusCode(HttpStatusCode.Unauthorized);
            ////else
            //return Ok(module);

            return Ok(new edumodule());
        }
    }
}
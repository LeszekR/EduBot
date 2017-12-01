using EduApi.DTO;
using System.Web.Http;
using System.Linq;
using EduApi.DAL;
using System.Web.Http.Cors;
using System.Collections.Generic;
using EduApi.Dto.Mappers;
using EduApi.Services;
using EduApi.Services.Interfaces;
using System.Net.Http.Headers;
using System.Net.Http;

namespace EduApi.Controllers {


    // =================================================================================================
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*", SupportsCredentials = true)]
    public class ModuleController : ApiController {

        private readonly IModuleService _moduleService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public ModuleController(IModuleService moduleService) {
            _moduleService = moduleService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        [HttpGet]
        public IHttpActionResult GetNextModule() {

            CookieHeaderValue cookie = Request.Headers.GetCookies("session-id").FirstOrDefault();

            if (cookie == null)
                return Unauthorized();

            string sessionId = cookie["session-id"].Value;

            return Ok(_moduleService.NextModule(sessionId));

            //return Ok("session-id: " + sessionId);
        }


        // ---------------------------------------------------------------------------------------------
        public IHttpActionResult GetSimpleModules() {
            return Ok(_moduleService.GetSimpleModules());
        }

        // ---------------------------------------------------------------------------------------------
        public IHttpActionResult GetModule(int id) {
            return Ok(_moduleService.GetModule(id));
        }

        // ---------------------------------------------------------------------------------------------
        [HttpPost]
        public IHttpActionResult UpsertModule(ModuleDTO moduleReceived) {
            return Ok(_moduleService.UpsertModule(moduleReceived));
        }

        // ---------------------------------------------------------------------------------------------
        [HttpPost]
        public IHttpActionResult NewMetaModule(ModuleDTO[] moduleGroup) {
            return Ok(_moduleService.NewMetaModule(moduleGroup));
        }

        // ---------------------------------------------------------------------------------------------
        [HttpDelete]
        public IHttpActionResult DeleteModule(int id) {
            return Ok(_moduleService.DeleteModule(id));
        }

        //// ---------------------------------------------------------------------------------------------
        //[HttpPost]
        //public IHttpActionResult Usun(int id) {
        //    return Ok(_moduleService.DeleteModule(id));
        //}
    }
}
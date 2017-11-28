using EduApi.DTO;
using System.Web.Http;
using System.Linq;
using EduApi.DAL;
using System.Web.Http.Cors;
using System.Collections.Generic;
using EduApi.Dto.Mappers;
using EduApi.Services;
using EduApi.Services.Interfaces;

namespace EduApi.Controllers {


    // -------------------------------------------------------------------------------------------------
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "GET,POST", SupportsCredentials = true)]
    public class ModuleController : ApiController {

        private readonly IModuleService _moduleService;

        #region Constructor
        public ModuleController(IModuleService moduleService) {
            _moduleService = moduleService;
        }
        #endregion


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
    }
}
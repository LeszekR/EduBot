﻿using EduApi.DTO;
using System.Web.Http;
using System.Web.Http.Cors;
using EduApi.Services.Interfaces;

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
        //[HttpGet]
        //public IHttpActionResult CreateModuleSequence() {
        //    _moduleService.CreateModuleSequence();
        //    return Ok("Odnowiono sekwencję modułów");
        //}

        // ---------------------------------------------------------------------------------------------
        public IHttpActionResult GetSimpleModulesOfUser() {
            int userId = 1;
            return Ok(_moduleService.GetSimpleModules(userId));
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
        public IHttpActionResult UpsertModule([FromBody]ModuleDTO moduleReceived) {
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
    }
}
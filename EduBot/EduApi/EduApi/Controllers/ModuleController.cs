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
        [HttpGet]
        public IHttpActionResult GetNextModule() {
            int userId = 0;
            return Ok(_moduleService.NextModule(userId));
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
    }
}
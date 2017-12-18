﻿using EduApi.DTO;
using System.Web.Http;
using System.Web.Http.Cors;
using EduApi.Services.Interfaces;
using EduApi.Dto;

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
        public IHttpActionResult CreateModuleSequence() {
            _moduleService.CreateModuleSequence();
            return Ok("Odnowiono sekwencję modułów");
        }

        // ---------------------------------------------------------------------------------------------
        [HttpPost]
        public IHttpActionResult VerifyClosedTest([FromBody]TestQuestionAnswDTO[] answers) {
            int userId = 1;
            return Ok(_moduleService.VerifyClosedTest(userId, answers));
        }

        // ---------------------------------------------------------------------------------------------
        [HttpGet]
        public IHttpActionResult ExplainModule(int id) {
            int userId = 1;
            return Ok(_moduleService.ExplainModule(userId, id));
        }

        // ---------------------------------------------------------------------------------------------
        public IHttpActionResult GetPrevModule(int id) {
            int userId = 1;
            return Ok(_moduleService.PrevModule(userId, id));
        }


        // ---------------------------------------------------------------------------------------------
        public IHttpActionResult GetNextModule(int id) {
            int userId = 1;
            return Ok(_moduleService.NextModule(userId, id));
        }


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
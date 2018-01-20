using EduApi.DTO;
using System.Web.Http;
using EduApi.Services.Interfaces;
using EduApi.Security;

namespace EduApi.Controllers {

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
        public IHttpActionResult ModuleResults(int id) {
            int userId = TokenHelper.GetUserId(User.Identity);
            return Ok(_moduleService.GetDTOWithResults(id, userId));
        }


        // ---------------------------------------------------------------------------------------------
        [HttpGet]
        public IHttpActionResult FillMetaModules() {
            return Ok(_moduleService.FillMetaModules());
        }


        // ---------------------------------------------------------------------------------------------
        public IHttpActionResult GetSimpleModulesOfUser() {
            int userId = TokenHelper.GetUserId(User.Identity);
            return Ok(_moduleService.GetSimpleModules(userId));
        }


        // ---------------------------------------------------------------------------------------------
        public IHttpActionResult GetSimpleModules() {
            return Ok(_moduleService.GetSimpleModules());
        }

        // ---------------------------------------------------------------------------------------------
        public IHttpActionResult GetModuleEdit(int id) {
            return Ok(_moduleService.GetModuleEdit(id));
        }

        // ---------------------------------------------------------------------------------------------
        public IHttpActionResult GetModuleLearn(int id) {
            int userId = TokenHelper.GetUserId(User.Identity);
            return Ok(_moduleService.GetModuleLearn(id, userId));
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
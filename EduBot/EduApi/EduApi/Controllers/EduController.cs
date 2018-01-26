using EduApi.Dto;
using EduApi.Security;
using EduApi.Services;
using EduApi.Services.Interfaces;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EduApi.Controllers {

    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*", SupportsCredentials = true)]
    public class EduController : ApiController {

        private readonly IEduAlgorithmService _eduAlgorithmService;
        private readonly AffitsApiAdapter _affitsApiAdapter;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public EduController(
                IEduAlgorithmService eduAlgorithmService,
                AffitsApiAdapter affitsApiAdapter
            ) {
            _eduAlgorithmService = eduAlgorithmService;
            _affitsApiAdapter = affitsApiAdapter;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public IHttpActionResult GetScore() {
            int userId = TokenHelper.GetUserId(User.Identity);
            return Ok(_eduAlgorithmService.GetScore(userId));
        }

        // ---------------------------------------------------------------------------------------------
        [HttpGet]
        public IHttpActionResult ExplainModule(int id) {
            int userId = TokenHelper.GetUserId(User.Identity);
            return Ok(_eduAlgorithmService.ExplainModule(userId, id));
        }

        // ---------------------------------------------------------------------------------------------
        [HttpGet]
        public IHttpActionResult PrevModule(int id) {
            int userId = TokenHelper.GetUserId(User.Identity);
            return Ok(_eduAlgorithmService.PrevModule(userId, id));
        }

        // ---------------------------------------------------------------------------------------------
        [HttpGet]
        public IHttpActionResult NextModule(int id) {
            int userId = TokenHelper.GetUserId(User.Identity);
            List<Pad> lastEmoStates = _affitsApiAdapter.getResults(userId);
            return Ok(_eduAlgorithmService.NextModule(userId, id, lastEmoStates));
        }
    }
}
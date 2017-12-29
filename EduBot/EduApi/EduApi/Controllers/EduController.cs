﻿using EduApi.Security;
using EduApi.Services.Interfaces;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EduApi.Controllers {

    public class EduController : ApiController {

        private readonly IEduAlgorithmService _eduAlgorithmService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public EduController(IEduAlgorithmService eduAlgorithmService) {
            _eduAlgorithmService = eduAlgorithmService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
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
            return Ok(_eduAlgorithmService.NextModule(userId, id));
        }
    }
}
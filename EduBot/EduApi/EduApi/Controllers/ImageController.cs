using EduApi.Dto;
using EduApi.Security;
using EduApi.Services;
using EduApi.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EduApi.Controllers {

    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*", SupportsCredentials = true)]
    public class ImageController : ApiController {

        private readonly IUserService _userService;
        private readonly AffitsApiAdapter _affitsApiAdapter;
        private readonly IEduAlgorithmService _eduService;

        public int FromBody { get; private set; }


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public ImageController(
            IUserService userService,
            AffitsApiAdapter affitsApiAdapter,
            IEduAlgorithmService eduAlgorithmService
            ) {
            _userService = userService;
            _affitsApiAdapter = affitsApiAdapter;
            _eduService = eduAlgorithmService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        [Route("api/image/send")]
        [HttpPost]
        public IHttpActionResult sendImage([FromBody]string image) {
            int userId = TokenHelper.GetUserId(User.Identity);
            try {
                if (_affitsApiAdapter.processImage(image)) {
                    List<Pad> lastEmoStates = _affitsApiAdapter.getResults();
                    DistractorDTO distractor = _eduService.KickTheStudent(userId, lastEmoStates);
                    return Ok(distractor);
                }

                return BadRequest("unprocessed");
            }
            catch (Exception e) {
                return Ok(e.ToString());
            }
        }

        // ---------------------------------------------------------------------------------------------
        // TODO allows to see session state. to remove
        [Route("api/results-affit")]
        [HttpGet]
        public IHttpActionResult GetResults() {

            try {
                List<Pad> pads = _affitsApiAdapter.getResults();

                string result = "Session stores: ";

                pads.ForEach(delegate (Pad pad) {
                    result += "{ts:" + pad.timestamp + ";state:" + pad.state + "}";
                });

                return Ok(result);
            }
            catch (Exception e) {
                return Ok(e.ToString());
            }
        }
    }
}

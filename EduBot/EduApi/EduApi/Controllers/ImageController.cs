using EduApi.Services;
using EduApi.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace EduApi.Controllers
{

    public class ImageController : ApiController {

        private readonly IUserService _userService;
        private readonly AffitsApiAdapter _affitsApiAdapter;

        public int FromBody { get; private set; }

        #region Constructor
        public ImageController(IUserService userService, AffitsApiAdapter affitsApiAdapter)
        {
            _userService = userService;
            _affitsApiAdapter = affitsApiAdapter;
        }
        #endregion

        [Route("api/image/send")]
        [HttpPost]
        public IHttpActionResult sendImage([FromBody]string image)
        {
            try {
                if (_affitsApiAdapter.processImage(image))
                {
                    return Ok("success");
                }

                return BadRequest("unprocessed");
            } catch (Exception e)
            {
                return Ok(e.ToString());
            }
        }

        // TODO allows to see session state. to remove
        [Route("api/results-affit")]
        [HttpGet]
        public IHttpActionResult GetResults()
        {
            try
            {
                List<Pad> pads = _affitsApiAdapter.getResults();

                string result = "Session stores: ";

                pads.ForEach(delegate (Pad pad)
                {
                    result += "{ts:" + pad.timestamp + ";state:" + pad.state + "}";
                });

                return Ok(result);
            }
            catch (Exception e)
            {
                return Ok(e.ToString());
            }
        }
    }
}

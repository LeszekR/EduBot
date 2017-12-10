using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EduApi.Controllers {


    // =================================================================================================
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*", SupportsCredentials = true)]
    public class EmoServiceController : ApiController {

        public enum EmoState { BORED, FRUSTRATED, OK }
        public static EmoState _emoState = EmoState.OK;



        // PUBLIC
        // =============================================================================================
        [HttpPost]
        public IHttpActionResult SetEmoState([FromBody]int emoState) {

            if (emoState == -1)
                _emoState = EmoState.BORED;
            else if (emoState == 0)
                _emoState = EmoState.OK;
            if (emoState == 1)
                _emoState = EmoState.FRUSTRATED;

            return Ok("Ustawiono emostan: " + _emoState.ToString());
        }
    }
}
using EduApi.Services.Interfaces;
using System.Web.Http;
using System.Web.Http.Cors;

namespace EduApi.Controllers {


    // =================================================================================================
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*", SupportsCredentials = true)]
    public class EmoServiceController : ApiController {

        public enum EmoState { BORED, FRUSTRATED, OK }
        public static EmoState _emoState = EmoState.OK;

        private readonly IUserService _userService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public EmoServiceController(IUserService userService) {
            _userService = userService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        [HttpPost]
        public IHttpActionResult SetEmoState([FromBody]int emoState) {


            if (emoState == -1)
                _emoState = EmoState.BORED;
            else if (emoState == 0)
                _emoState = EmoState.OK;
            else if (emoState == 1)
                _emoState = EmoState.FRUSTRATED;
            else if (emoState == 2) {
                int userId = 1;
                _userService.ClearModuleHistory(userId);
                return Ok("Wyczyszczono historię modułów");
            }

            return Ok("Ustawiono emostan: " + _emoState.ToString());
        }
    }
}
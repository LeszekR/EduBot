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
        //private readonly ITestQuestionService _questionService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public EmoServiceController(IUserService userService/*, ITestQuestionService questionService*/) {
            _userService = userService;
            //_questionService = questionService;
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
            else if (emoState == 3) {
                int userId = 1;
                _userService.ClearQuestionHistory(userId);
                return Ok("Wyczyszczono historię pytań");
            }

            return Ok("Ustawiono emostan: " + _emoState.ToString());
        }
    }
}
using EduApi.Dto;
using EduApi.Security;
using EduApi.Services.Interfaces;
using System.Web.Http;

namespace EduApi.Controllers {

    public class EmoServiceController : ApiController {

        public static EmoState _emoState = EmoState.UNDEFINED;
        private readonly IUserService _userService;
        private readonly IModuleService _moduleService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public EmoServiceController(
            IUserService userService,
            IModuleService moduleService
            //ITestQuestionService questionService
            ) {
            _userService = userService;
            _moduleService = moduleService;
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
                int userId = TokenHelper.GetUserId(User.Identity);
                _userService.ClearModuleHistory(userId);
                return Ok("Wyczyszczono historię modułów, pytań i dystraktorów");
            }

            return Ok("Ustawiono emostan: " + _emoState.ToString());
        }
    }
}
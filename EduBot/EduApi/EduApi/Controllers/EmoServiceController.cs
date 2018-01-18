using EduApi.Dto;
using EduApi.Dto.Mappers;
using EduApi.Security;
using EduApi.Services;
using EduApi.Services.Interfaces;
using System.Linq;
using System.Web.Http;

namespace EduApi.Controllers {

    public class EmoServiceController : ApiController {

        public static EmoState _emoState = EmoState.UNDEFINED;
        private readonly IUserService _userService;
        private readonly IModuleService _moduleService;
        private readonly IDistractorService _distractorService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public EmoServiceController(
            IUserService userService,
            IModuleService moduleService,
            IDistractorService distractorService
            ) {
            _userService = userService;
            _moduleService = moduleService;
            _distractorService = distractorService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        [HttpPost]
        public IHttpActionResult SetEmoState([FromBody]int emoState) {

            int userId = TokenHelper.GetUserId(User.Identity);

            if (emoState == -1)
                _emoState = EmoState.BORED;

            else if (emoState == 0)
                _emoState = EmoState.OK;

            else if (emoState == 1)
                _emoState = EmoState.FRUSTRATED;

            else if (emoState == 2) {
                _userService.ClearModuleHistory(userId);
                return Ok("Wyczyszczono historię modułów, pytań i dystraktorów");
            }
            else if (emoState == 3)
                return Ok(_distractorService.MockDistractor(userId, DistractorType.REWARD));

            else if (emoState == 4)
                return Ok(_distractorService.MockDistractor(userId, DistractorType.KICK));

            return Ok("Ustawiono emostan: " + _emoState.ToString());
        }
    }
}
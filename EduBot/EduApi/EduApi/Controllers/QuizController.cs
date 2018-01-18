using EduApi.Dto;
using EduApi.Security;
using EduApi.Services.Interfaces;
using System.Web.Http;

namespace EduApi.Controllers {

    public class QuizController : ApiController {

        private readonly IQuizService _quizService;
        private readonly IEduAlgorithmService _eduAlgorithmService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public QuizController(
            IQuizService quizService,
            IEduAlgorithmService eduAlgorithmService
            ) {
            _quizService = quizService;
            _eduAlgorithmService = eduAlgorithmService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        [HttpPost]
        public IHttpActionResult Lottery([FromBody] Lottery drawnPrize) {
            int userId = TokenHelper.GetUserId(User.Identity);
            _quizService.RecordLottery(userId, drawnPrize);
            return Ok(_eduAlgorithmService.GetScore(userId));
        }

        // ---------------------------------------------------------------------------------------------
        [HttpPost]
        public IHttpActionResult VerifyCodeTest([FromBody]TestCodeAnswDTO code) {
            int userId = TokenHelper.GetUserId(User.Identity);
            return Ok(_quizService.VerifyCodeTest(code, userId));
        }

        // ---------------------------------------------------------------------------------------------
        [HttpPost]
        public IHttpActionResult VerifyClosedTest([FromBody]TestQuestionAnswDTO[] answers) {
            int userId = TokenHelper.GetUserId(User.Identity);
            return Ok(_quizService.VerifyClosedTest(answers, userId));
        }
    }
}
using EduApi.Dto;
using EduApi.Security;
using EduApi.Services.Interfaces;
using System.Web.Http;

namespace EduApi.Controllers {

    public class QuizController : ApiController {

        private readonly IQuizService _quizService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public QuizController(IQuizService quizService) {
            _quizService = quizService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        [HttpPost]
        public IHttpActionResult VerifyCodeTest([FromBody]TestCodeDTO code) {
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
using EduApi.Dto;
using EduApi.Dto.Mappers;
using EduApi.Repositories.Interfaces;
using EduApi.Services.Interfaces;

namespace EduApi.Services {


    // =================================================================================================
    public class TestQuestionService : ITestQuestionService {

        private readonly ITestQuestionRepository _questionRepository;
        private readonly IUserService _userService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public TestQuestionService(
            ITestQuestionRepository questionRepository,
            IUserService userService) {

            _questionRepository = questionRepository;
            _userService = userService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public TestQuestionDTO UpsertQuestion(TestQuestionDTO questionReceived) {

            var id = questionReceived.id;
            test_question question;

            if (id == 0) {
                question = new test_question();
                TestQuestionMapper.CopyValues(questionReceived, question);
                _questionRepository.Add(question);
            }
            else {
                question = _questionRepository.Get(id);
                _questionRepository.SetNewValues(questionReceived, question);
            }

            return TestQuestionMapper.GetDTO(question);
        }


        // ---------------------------------------------------------------------------------------------
        public void DeleteQuestion(int id) {
            _questionRepository.Delete(id);
        }


        // ---------------------------------------------------------------------------------------------
        public test_question GetQuestionEntity(int id) {
            return _questionRepository.Get(id);
        }
    }
}
using EduApi.Dto;
using EduApi.Dto.Mappers;
using EduApi.Repositories.Interfaces;
using EduApi.Services.Interfaces;
using System.Collections.Generic;

namespace EduApi.Services {

    // =================================================================================================
    public class TestQuestionService : ITestQuestionService {

        private readonly ITestQuestionRepository _questionRepository;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public TestQuestionService(ITestQuestionRepository questionRepository) {
            _questionRepository = questionRepository;
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
        public List<test_question> SelectQuestionsForModule(int module_id) {
            return _questionRepository.SelectQuestionsForModule(module_id);
        }
    }
}
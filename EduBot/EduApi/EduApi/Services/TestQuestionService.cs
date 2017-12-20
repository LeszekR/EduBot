using EduApi.DAL.Interfaces;
using EduApi.Dto;
using EduApi.Dto.Mappers;
using EduApi.Repositories.Interfaces;
using EduApi.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

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
        public List<TestQuestionAnswDTO> VerifyClosedTest(TestQuestionAnswDTO[] answers, int userId) {

            var answersList = answers.ToList();
            var user = _userService.GetUserEntity(userId);

            string questionDataStr;
            int correctAnswer;

            foreach (var ans in answersList) {

                // Ustalenie indeksu poprawnej odpowiedzi dla tego pytania
                test_question question = GetQuestionEntity(ans.question_id);
                questionDataStr = question.question_answer;
                correctAnswer = Int32.Parse(questionDataStr.Split('^')[1]);

                // Ustawienie :
                // - prawidłowości wyniku na liście odpowiedzi użytkownika,
                // - odpowiedzi dla frontu - użytkownik odpowiedział prawidłowo lub nie.
                bool result;
                if (ans.answer_id == correctAnswer) {
                    result = true;
                    ans.answer_id = 1;
                }
                else {
                    result = false;
                    ans.answer_id = 0;
                }

                // Dodanie pytania do listy pytań, na które użytkownik odpowiedział
                user_question answeredQuestion = user.user_question.ToList()
                    .Where(q => q.question_id == ans.question_id)
                    .FirstOrDefault();


                // Dodanie nowego pytania do listy pytań, na które użytkownik odpowiedział
                if (answeredQuestion == null) {
                    answeredQuestion = new user_question() {
                        question_id = ans.question_id,
                        user_id = userId,
                        first_result = result
                    };
                    user.user_question.Add(answeredQuestion);
                }
                answeredQuestion.result = result;
            }

            _userService.SaveChanges();

            return answersList;
        }


        // ---------------------------------------------------------------------------------------------
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


        // ---------------------------------------------------------------------------------------------
        public test_question GetQuestionEntity(int id) {
            return _questionRepository.Get(id);
        }
    }
}
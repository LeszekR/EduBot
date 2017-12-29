using EduApi.Dto;
using EduApi.Dto.Mappers;
using EduApi.Repositories.Interfaces;
using EduApi.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
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
        public int GetRecentResults(int userId) {

            // Assumptions:
            // 1.the app serves consequent modules in pre-planned order
            // 2.user will not get next module until they answer current module's test 
            //
            // This way latest modules are also the ones answered most recently, therefore
            // counting correct answers backwards from the last answered will give picture
            // of the most recent results of the user in their tests.


            // pobranie parametrów sterujących obliczeniem średnich wyników
            var nLastAnswersStr = ConfigurationManager.AppSettings["nLastAnswersForDiffTreshold"];
            var nLastAnswers = Int32.Parse(nLastAnswersStr);

            
            // pobranie i posortowanie modułów użytkownika
            var modulesOfUser = _userService.GetUserEntity(userId).edumodule.ToList();
            ModuleService.SortGroupPosition(ref modulesOfUser);


            // pobieranie odpowiedzi do modułów zaczynając od końca 
            // dopóki nie zostanie osiągnięta wymagana liczba pytań
            // i obliczanie średniej trafności pierwszej odpowiedzi na pytanie
            int nAnswers = 0;
            int nGoodAnswers = 0;
            int i = modulesOfUser.Count();
            user_question user_question;

            while (i > 0 && nAnswers < nLastAnswers) {
                i--;
                foreach (var q in modulesOfUser[i].test_question.ToList()) {
                    nAnswers++;
                    user_question = q.user_question.FirstOrDefault();
                    if (user_question != null)
                        nGoodAnswers += (user_question.first_result == true) ? 1 : 0;
                }
            }


            // Jeżeli użytkownik nie odpowiedział jeszcze na wymaganą tu liczbę pytań - metoda zwraca -1 
            // i wynik jest pomijany przy decyzji o poziomie trudności kolejnego modułu.
            if (nAnswers < nLastAnswers)
                return -1;

            // Użytkownik odpowiedział na wystarczającą liczbe pytań.
            else
                return (nGoodAnswers / nAnswers) * 100;
        }


        // ---------------------------------------------------------------------------------------------
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
                int lastAnswer = ans.answer_id;
                if (lastAnswer == correctAnswer) {
                    result = true;
                    ans.answer_id = 1;
                }
                else {
                    result = false;
                    ans.answer_id = 0;
                }



                // Pobranie pytania z listy pytań, na które użytkownik już odpowiadał ...
                user_question answeredQuestion = user.user_question.ToList()
                    .Where(q => q.question_id == ans.question_id)
                    .FirstOrDefault();

                // ... lub dodanie nowego pytania do listy pytań, na które użytkownik odpowiedział
                if (answeredQuestion == null) {
                    answeredQuestion = new user_question() {
                        question_id = ans.question_id,
                        user_id = userId,
                        first_result = result
                    };
                    user.user_question.Add(answeredQuestion);
                }
                answeredQuestion.last_result = result;
                answeredQuestion.last_answer = lastAnswer;
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
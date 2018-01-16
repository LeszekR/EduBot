﻿using EduApi.Dto;
using EduApi.Dto.Mappers;
using EduApi.Repositories.Interfaces;
using EduApi.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;


namespace EduApi.Services {


    // =================================================================================================
    public enum GameItem { QUESTION, CODE, LOTTERY }
    public enum Lottery { GRENADE, CASINO, HOSPITAL, CANARIES, HELMET }
    public enum MilitaryRank {
        Soldier,
        Corporal,
        Sergeant,
        WarrantOfficer,
        Lieutenant,
        Captain,
        Major,
        Colonel,
        General
    }



    // =================================================================================================
    public class QuizService : IQuizService {

        private readonly IUserService _userService;
        private readonly ITestQuestionRepository _questionRepository;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public QuizService(
            IUserService userService,
            ITestQuestionRepository questionRepository) {

            _userService = userService;
            _questionRepository = questionRepository;
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
        public bool VerifyCodeTest(TestCodeAnswDTO code, int userId) {

            var user = _userService.GetUserEntity(userId);

            // Pobranie kodu z listy kodów, na które użytkownik już odpowiadał ...
            user_code solvedCode = user.user_code.ToList()
                .Where(c => c.code_id == code.codeTaskId)
                .FirstOrDefault();

            // ... lub dodanie nowego kodu do listy kodów, na które użytkownik odpowiedział
            if (solvedCode == null) {
                solvedCode = new user_code() {
                    user_id = userId,
                    code_id = code.codeTaskId,
                    first_result = code.lastResult
                };
                user.user_code.Add(solvedCode);
            }
            solvedCode.last_answer = code.answer;
            solvedCode.last_result = code.lastResult;
            solvedCode.attempts += 1;

            _userService.SaveChanges();

            return code.lastResult;
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
                        user_id = userId,
                        question_id = ans.question_id,
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
        public test_question GetQuestionEntity(int id) {
            return _questionRepository.Get(id);
        }


        // PRIVATE
        // =============================================================================================
        private void CalculateGame(int userId, GameItem item, bool correct, Lottery lottery) {

            string change = null;

            // QUESTION has been answered
            if (item == GameItem.QUESTION)
                if (correct)
                    change = ConfigurationManager.AppSettings["answerGood"];
                else
                    change = ConfigurationManager.AppSettings["answerBad"];


            // CODE TASK solution has been attempted
            if (item == GameItem.CODE)
                if (correct)
                    change = ConfigurationManager.AppSettings["codeGood"];
                else
                    change = ConfigurationManager.AppSettings["codeBad"];


            // LOTTERY has been run
            if (item == GameItem.LOTTERY)
                switch (lottery) {
                    case Lottery.CANARIES:
                        change = ConfigurationManager.AppSettings["kanary"];
                        break;
                    case Lottery.CASINO:
                        change = ConfigurationManager.AppSettings["kasyno"];
                        break;
                    case Lottery.GRENADE:
                        change = ConfigurationManager.AppSettings["granat"];
                        break;
                    case Lottery.HELMET:
                        change = ConfigurationManager.AppSettings["helm"];
                        break;
                    case Lottery.HOSPITAL:
                        change = ConfigurationManager.AppSettings["szpital"];
                        break;
                }


            // read current game score of the user
            var score = _userService.GetUserEntity(userId).user_game;


            // life & shield
            var changeElems = change.Split('*');
            if (changeElems[0] == "life")
                score.life += Int32.Parse(changeElems[1]);
            else
                score.shield += (Decimal)Double.Parse(changeElems[1]);




            // dath or maybe promotion


            // save new score
        }
    }
}
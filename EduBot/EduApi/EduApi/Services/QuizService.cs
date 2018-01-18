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
    public class QuizService : IQuizService {

        private readonly IUserService _userService;
        private readonly ITestQuestionRepository _questionRepository;
        private readonly IModuleService _moduleService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public QuizService(
            IUserService userService,
            ITestQuestionRepository questionRepository,
            IModuleService moduleService) {

            _userService = userService;
            _questionRepository = questionRepository;
            _moduleService = moduleService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public void RecordLottery(int userId, Lottery lottery) {
            var user = _userService.GetUserEntity(userId);
            CalculateGame(ref user, GameItem.LOTTERY, true, lottery);
            _userService.SaveChanges();
        }


        // ---------------------------------------------------------------------------------------------
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
        public CodeAttempt VerifyCodeTest(TestCodeAnswDTO code, int userId) {

            var user = _userService.GetUserEntity(userId);
            bool prevResult;

            // Pobranie kodu z listy kodów, na które użytkownik już odpowiadał ...
            user_code solvedCode = user.user_code.ToList()
                .Where(c => c.code_id == code.codeTaskId)
                .FirstOrDefault();

            if (solvedCode != null)
                prevResult = solvedCode.last_result;


            // ... lub dodanie nowego kodu do listy kodów, na które użytkownik odpowiedział
            else {
                prevResult = false;

                solvedCode = new user_code() {
                    user_id = userId,
                    code_id = code.codeTaskId,
                    first_result = code.lastResult
                };
                user.user_code.Add(solvedCode);
            }

            solvedCode.last_result = code.lastResult;
            solvedCode.last_answer = code.answer;
            solvedCode.attempts += 1;


            // sprawdzenie czy to trzecia próba rozwiązania kodu
            // jesli trzecia - index wyniesie 0
            var attemptIndex = solvedCode.attempts % 3;

            // przeliczenie życia, ochrony i awansu sapera
            if (!prevResult || !solvedCode.last_result)
                if (solvedCode.last_result == true || attemptIndex == 0)
                    CalculateGame(ref user, GameItem.CODE, code.lastResult, Lottery.NO_LOTTERY);


            _userService.SaveChanges();

            if (code.lastResult == true)
                return CodeAttempt.CORRECT;
            else
                return (CodeAttempt)(attemptIndex);
        }


        // ---------------------------------------------------------------------------------------------
        public List<TestQuestionAnswDTO> VerifyClosedTest(TestQuestionAnswDTO[] answers, int userId) {

            var answersList = answers.ToList();
            var user = _userService.GetUserEntity(userId);

            string questionDataStr;
            int correctAnswer;
            bool prevResult;

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


                // Domyślny poprzedni wynik odpowiedzi na to pytanie
                prevResult = false;

                // Pobranie pytania z listy pytań, na które użytkownik już odpowiadał ...
                user_question answeredQuestion = user.user_question.ToList()
                    .Where(q => q.question_id == ans.question_id)
                    .FirstOrDefault();

                if (answeredQuestion != null)
                    prevResult = answeredQuestion.last_result;

                // ... lub dodanie nowego pytania do listy pytań, na które użytkownik odpowiedział
                else {
                    prevResult = false;

                    answeredQuestion = new user_question() {
                        user_id = userId,
                        question_id = ans.question_id,
                        first_result = result
                    };
                    user.user_question.Add(answeredQuestion);
                }

                answeredQuestion.last_result = result;
                answeredQuestion.last_answer = lastAnswer;


                // przeliczenie życia, ochrony i awansu sapera
                if (!prevResult || !answeredQuestion.last_result)
                    CalculateGame(ref user, GameItem.QUESTION, result, Lottery.NO_LOTTERY);
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
        private void CalculateGame(ref user user, GameItem item, bool correct, Lottery lottery) {

            string change = null;

            // QUESTION has been answered
            if (item == GameItem.QUESTION)
                if (correct)
                    change = ConfigurationManager.AppSettings["answerGood"];
                else
                    change = ConfigurationManager.AppSettings["answerBad"];


            // CODE TASK solution has been attempted
            else if (item == GameItem.CODE)
                if (correct) {
                    change = ConfigurationManager.AppSettings["codeGood"];
                    //TODO - zresetować attempts gdy przychodzi prawidłowe rozwiązanie
                }
                else
                    change = ConfigurationManager.AppSettings["codeBad"];


            // LOTTERY has been run
            else if (item == GameItem.LOTTERY)
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
            var score = user.user_game;

            var changeElems = change.Split('*');
            var changeWhat = changeElems[0];
            var changeValue = changeElems[1];


            // LIFE  & SHIELD 
            if (changeWhat == "life")
                SetLife(ref score, changeValue);
            else
                SetShield(ref score, changeValue);


            // PROMOTION
            Promotion(ref user);


            // do NOT save new score - it will be saved in the method calling this one
        }


        // ---------------------------------------------------------------------------------------------
        private void Promotion(ref user user) {

            var userQuestions = user.user_question.ToList();
            var userCodes = user.user_code.ToList();
            var hardUserModules = user.edumodule
                .Select(m => {
                    if (m.difficulty == "hard")
                        return m;
                    if (m.difficulty == "medium")
                        return m.edumodule2;
                    return m.edumodule2.edumodule2;
                })
                .Distinct().ToList();


            // check each 'hard' module the user has worked on
            List<test_question> moduleQuestions;
            List<test_code> moduleCodes;
            int nPassedModules = 0;

            foreach (var module in hardUserModules) {

                // get all questions for the module 
                moduleQuestions = _moduleService.QuestionsForModule(module);

                // the user has not answered the question yet
                if (moduleQuestions.Exists(q => !userQuestions.Exists(uq => q.id == uq.question_id)))
                    continue;

                // the user answered incorrectly
                if (userQuestions.Exists(uq => uq.last_result == false))
                    continue;


                // get all codeTasks
                moduleCodes = _moduleService.CodesForModule(module);

                // the user has not tried this code yet
                if (moduleCodes.Exists(c => !userCodes.Exists(uc => c.id == uc.code_id)))
                    continue;

                // the user answered incorrectly
                if (userCodes.Exists(uc => uc.last_result == false))
                    continue;

                // if number of incorrect answers+codes == 0 - increment nPassed 'hard' modules
                nPassedModules++;
            }


            // find the rank assiged to this number of passed 'hard' modules
            var rankStep = Int32.Parse(ConfigurationManager.AppSettings["rankStep"]);
            var newRank = (int)(nPassedModules / rankStep);

            // assign the rank to the user
            var oldRank = user.user_game.rank;
            user.user_game.rank = newRank;

            // reord in the database that the user is to receive 'promotion' distractor
            if (newRank > oldRank)
                user.user_game.promotion = 1;
            else if (newRank == oldRank)
                user.user_game.promotion = 0;
            else
                user.user_game.promotion = -1;
        }


        // ---------------------------------------------------------------------------------------------
        private static void SetLife(ref user_game score, string change) {

            var maxLife = Int32.Parse(ConfigurationManager.AppSettings["maxLife"]);
            var lifeChange = (int)(Int32.Parse(change));

            // shield reduces loss of life
            if (lifeChange < 0) {
                double shieldFactor = (double)(1 - Math.Floor(score.shield / 10) / 10);
                lifeChange = (int)(lifeChange * shieldFactor / 100 * maxLife);
            }

            // life in database counts from 0 to "maxLife" as set in Web.config (now: 1000)
            score.life += lifeChange;

            // death
            if (score.life < 0) {
                score.life = 0;
                score.shield = 0;
                score.rank = 0;
            }
        }


        // ---------------------------------------------------------------------------------------------
        private static void SetShield(ref user_game score, string change) {

            score.shield += (Decimal)Double.Parse(change);

            // keep the shield within proper boudaries
            var maxShield = Int32.Parse(ConfigurationManager.AppSettings["maxShield"]);

            if (score.shield > maxShield)
                score.shield = maxShield;
            else if (score.shield < 0)
                score.shield = 0;
        }
    }
}
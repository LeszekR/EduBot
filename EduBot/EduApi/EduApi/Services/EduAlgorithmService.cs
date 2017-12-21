using EduApi.Services.Interfaces;
using System.Linq;
using EduApi.Controllers;
using EduApi.DAL.Interfaces;
using System.Configuration;
using System;

namespace EduApi.Services {

    public enum ChangeDifficulty { UP, NO_CHANGE, DOWN };
    public enum DistractorType { NO_DISTRACTOR, KICK, REWARD };


    // =================================================================================================
    public class EduAlgorithmService : IEduAlgorithmService {

        private readonly IModuleRepository _moduleRepository;
        //private readonly IModuleService _moduleService;
        //private readonly IUserService _userService;
        private readonly ITestQuestionService _questionService;
        private readonly IDistractorService _distractorService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public EduAlgorithmService(
            IModuleRepository moduleRepository,
            //IModuleService moduleService,
            //IUserService userService,
            ITestQuestionService questionService,
            IDistractorService distractorService
            ) {

            _moduleRepository = moduleRepository;
            //_moduleService = moduleService;
            //_userService = userService;
            _questionService = questionService;
            _distractorService = distractorService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public Tuple<ChangeDifficulty, DistractorType> PickNextDiffAndDistract(int userId) { 

            // TODO: sprawdzenie stanu emocjonalnego
            var emoState = EmoServiceController._emoState;

            // próg wyników, powyżej którego można utrudnić materiał
            var resultsTresholdStr = ConfigurationManager.AppSettings["resultsDiffTreshold"];
            var resultsTreshold = Int32.Parse(resultsTresholdStr);

            // sprawdzenie ostatnich wyników testów
            var recentTestScore = _questionService.GetRecentResults(userId);
            var noResults = recentTestScore == -1;
            var highResults = recentTestScore >= resultsTreshold;



            ChangeDifficulty changeDifficulty;
            DistractorType distractorType;


            
            // OPTYMALNY stan emocjonalny ...............................................
            changeDifficulty = ChangeDifficulty.NO_CHANGE;
            distractorType = DistractorType.NO_DISTRACTOR;


            // ZNUDZONY stan emocjonalny ................................................
            if (emoState == EmoServiceController.EmoState.BORED) {

                // wyniki były wysokie
                if (highResults || noResults) {
                    changeDifficulty = ChangeDifficulty.UP;
                    distractorType = DistractorType.KICK;
                }

                // wyniki były niskie
                else {
                    changeDifficulty = ChangeDifficulty.NO_CHANGE;
                    distractorType = DistractorType.REWARD;
                }
            }


            // SFRUSTROWANY stan emocjonalny ............................................
            else if (emoState == EmoServiceController.EmoState.FRUSTRATED) {

                // wyniki były niskie
                if (!highResults || noResults)
                    changeDifficulty = ChangeDifficulty.DOWN;

                // wyniki były wysokie
                else
                    changeDifficulty = ChangeDifficulty.NO_CHANGE;

                distractorType = DistractorType.REWARD;
            }


            // decyzja
            return Tuple.Create(changeDifficulty, distractorType);
        }


        // ---------------------------------------------------------------------------------------------
        public edumodule PickNextModule(int lastModuleId, ChangeDifficulty change) {

            edumodule newModule = null;
            edumodule lastModule = _moduleRepository.Get(lastModuleId);

            // ustalenie aktualnego poziomu trudności
            var difficultyNow = lastModule.difficulty;


            // ustalenie czy można poziom zmienić
            bool noWayUp = (change == ChangeDifficulty.UP && difficultyNow == "hard");
            bool noWayDown = (change == ChangeDifficulty.DOWN && difficultyNow == "easy");

            if (noWayUp || noWayDown)
                change = ChangeDifficulty.NO_CHANGE;


            // TODO: uporządkować przypadek group_id == null - nie może występować
            // pobranie rodzeństwa bieżącego modułu
            int? parentId = lastModule.group_id;
            var siblings = _moduleRepository.SelectChildren(parentId);


            // wykluczenie modułów nie przypisanych do żadnego nadrzędnego, 
            // które powinny mieć rodzica (czyli na poziomie niższym niz "hard")
            siblings = siblings.Where(s => (s.group_id != null || s.difficulty == "hard")).ToList();
            ModuleService.SortGroupPosition(ref siblings);


            // ustalenie czy to ostatnie dziecko
            int idxChild = siblings.FindIndex(mod => mod.id == lastModuleId);
            bool lastChild = (idxChild == siblings.Count() - 1);



            // NIE ZMIENIAMY POZIOMU TRUDNOŚCI
            if (change == ChangeDifficulty.NO_CHANGE) {

                // to jeszcze nie ostatnie dziecko - podanie następnego brata
                if (!lastChild)
                    newModule = siblings[idxChild + 1];

                // TODO: wyeliminować przypadek gdy nie mamy id rodzica 
                else if (parentId == null || parentId == 0)
                    newModule = null;

                // to ostatnie dziecko - podanie pierwszego kuzyna
                else
                    newModule = PickNextModule(parentId ?? 0, ChangeDifficulty.DOWN);
            }


            // OBNIŻENIE POZIOMU TRUDNOŚCI - podanie pierwszego dziecka najbliższego brata
            else if (change == ChangeDifficulty.DOWN) {

                // to jeszcze nie ostatnie dziecko - podanie pierwszego dziecka następnego brata
                if (!lastChild) {
                    var brother = siblings[idxChild + 1];
                    newModule = _moduleRepository.SelectChildren(brother.id)[0];
                }

                // nie ma więcej modułów - ten był ostatni
                else if (lastModule.difficulty == "hard" || parentId == null || parentId == 0)
                    newModule = null;


                // pobranie dziecka najbliższego kuzyna
                else {
                    var cousin = PickNextModule(parentId ?? 0, ChangeDifficulty.DOWN);
                    newModule = (cousin == null) ? null : _moduleRepository.SelectChildren(cousin.id)[0];
                }
            }


            // PODNIESIENIE POZIOMU TRUDNOŚCI - podanie kolejnego modułu w wersji trudniejszej
            else {

                // to nie jest ostatnie dziecko - podanie następnego brata bez zmiany trudności
                if (!lastChild)
                    newModule = siblings[idxChild + 1];

                // moduł bez rodzica - nie można podnieśc poziomu trudności
                else if (parentId == null || parentId == 0)
                    newModule = null;

                // to jest ostatnie dziecko - podanie następnego trudniejszego
                else
                    newModule = PickNextModule(parentId ?? 0, ChangeDifficulty.NO_CHANGE);
            }

            return newModule;
        }
    }
}
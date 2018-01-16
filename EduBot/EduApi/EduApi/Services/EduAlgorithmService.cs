using System;
using System.Linq;
using System.Configuration;
using System.Collections.Generic;
using EduApi.Services.Interfaces;
using EduApi.Controllers;
using EduApi.DAL.Interfaces;
using EduApi.DTO;
using EduApi.Dto;
using EduApi.Dto.Mappers;
using NLog;

namespace EduApi.Services {


    // =================================================================================================
    public enum EmoState { UNDEFINED, BORED, FRUSTRATED, OK };
    public enum ChangeDifficulty { NO_CHANGE, UP, DOWN };
    public enum DistractorType { NO_DISTRACTOR, KICK, REWARD };


    // =================================================================================================
    public class EduAlgorithmService : IEduAlgorithmService {

        private readonly IModuleRepository _moduleRepository;
        private readonly IModuleService _moduleService;
        private readonly IUserService _userService;
        private readonly IQuizService _quizService;
        private readonly IDistractorService _distractorService;
        private Logger _logger;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public EduAlgorithmService(
            IModuleRepository moduleRepository,
            IModuleService moduleService,
            IUserService userService,
            IQuizService quizService,
            IDistractorService distractorService
            ) {

            _moduleRepository = moduleRepository;
            _moduleService = moduleService;
            _userService = userService;
            _quizService = quizService;
            _distractorService = distractorService;
            _logger = LogManager.GetCurrentClassLogger();
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public GameScoreDTO GetScore(int userId) {

            var user = _userService.GetUserEntity(userId);

            // obliczenie aktualnego postępu = procentu przerobionych modułów
            var userModulesAll = user.edumodule.ToList();
            int nDone = 0;
            List<edumodule> children;

            foreach (var m in userModulesAll) {

                // pobranie dzieci modułu
                children = _moduleService.SelectChildren(m.id);

                // jeżeli nie ma dzieci - dodajemy 1
                if (children.Count() == 0) {
                    nDone++;
                    continue;
                }

                // jeżeli którekolwiek dziecko też jest na liście - pomijamy ten moduł
                // a jeśli dzieci nie ma - dodajemy liczbę dzieci modułu, uwzględaniając
                // ich dzieci - liczymy tylko moduły na poziomie 'easy'
                if (children.FirstOrDefault(c => userModulesAll.Contains(c)) == null)
                    foreach (var child in children)
                        nDone += countEasiestChildren(child);
            }

            var nTotal = _moduleRepository.All().Count();
            var progress = nTotal == 0 ? 0 : 100 * nDone / nTotal;


            //// obliczenie aktualnego wyniku pytań zamkniętych = procentu prawidłowych odpowiedzi
            //var questions = user.user_question;
            //nTotal = questions.Count();
            //var nCorrect = questions.Where(q => q.last_result == true).Count();
            //var correctAnswers = nTotal == 0 ? 0 : 100 * nCorrect / nTotal;


            //// obliczenie aktualnego wyniku testów z kodu = procentu prawidłowych rozwiązań
            //var codes = user.user_code;
            //nTotal = codes.Count();
            //nCorrect = codes.Where(c => c.last_result == true).Count();
            //var correctCodes = nTotal == 0 ? 0 : 100 * nCorrect / nTotal;


            return new GameScoreDTO() {
                progress = progress,
                life = (int)(user.user_game.life / 10),
                shield = (int)(user.user_game.shield / 50 * 100),
                rank = user.user_game.rank
                //correctQuestions = correctAnswers,
                //correctCodes = correctCodes
            };
        }


        // ---------------------------------------------------------------------------------------------
        public DistractorDTO KickTheStudent(int userId, List<Pad> lastEmoStates) {


            //// TODO usunąć mock ***************************************************
            //Random rnd = new Random();
            //Func<EmoState> losuj = () => {
            //    var los = rnd.Next(1, 4);
            //    if (los == 1) return EmoState.BORED;
            //    if (los == 2) return EmoState.OK;
            //    if (los == 3) return EmoState.FRUSTRATED;
            //    return EmoState.UNDEFINED;
            //};
            //List<Pad> mockEmoStates = new List<Pad>(5);
            //string mocki = "";
            //for (int i = 0; i < 5; i++) {
            //    mockEmoStates.Add(new Pad("", losuj()));
            //    mocki += " " + i + ". " + mockEmoStates[mockEmoStates.Count() - 1].state.ToString();
            //}
            //lastEmoStates = mockEmoStates;
            //// ********************************************************************


            if (lastEmoStates.Count() < 5)
            {
                _logger.Debug("Not providing a distractor as not enough (" + lastEmoStates.Count() + ") emotional states gathered yet for user: " + userId);

                return null;
            }



            // ustalenie STANU EMOCJONALNEGO ..........................................
            // na podstawie zapamiętanych ostanich pięciu
            // (stan 4 - ostatni, stan 0 - najstarszy)
            EmoState emoStateNow = EmoState.UNDEFINED;
            var keepLooking = true;


            // jesli emostan 4 jest pozytywny - ustaw 'ok'
            // (jesli przedtem był negatywny - czekamy aż się potwierdzi)
            if (lastEmoStates[4].state == EmoState.OK) {
                emoStateNow = EmoState.OK;
                keepLooking = false;
            }

            // jeśli 2 przedostatnie są pozytywne - ustaw 'ok'
            // (czekamy na potwierdzenie ostatniego negatywnego stanu odczytanego po raz pierwszy)
            if (keepLooking) {
                var ok3 = lastEmoStates[3].state == EmoState.OK;
                var ok2 = lastEmoStates[2].state == EmoState.OK;

                if (ok3 && ok2) {
                    emoStateNow = EmoState.OK;
                    keepLooking = false;
                }
            }

            // jesli 2 ostatnie emostany są takie same - ustaw taki stan
            // (przyjmujemy dwukrotne wystąpienie na końcu jako potwierdzenie stanu)
            if (keepLooking) {
                var ok4 = lastEmoStates[4].state;
                var ok3 = lastEmoStates[3].state;

                if (ok4 == ok3) {
                    emoStateNow = ok4;
                    keepLooking = false;
                }
            }

            // jesli emostany 4 i 2 są takie same - ustaw taki stan
            // (przyjmujemy dwukrotne wystąpienie w ostatnich trzech jako potwierdzenie stanu)
            if (keepLooking) {
                var ok4 = lastEmoStates[4].state;
                var ok2 = lastEmoStates[2].state;

                if (ok4 == ok2) {
                    emoStateNow = ok2;
                    keepLooking = false;
                }
            }


            if (keepLooking) {
                var nOk = 0;
                var nBored = 0;
                var nFrust = 0;
                foreach (var emo in lastEmoStates) {
                    if (emo.state == EmoState.OK) nOk++;
                    if (emo.state == EmoState.BORED) nBored++;
                    if (emo.state == EmoState.FRUSTRATED) nFrust++;
                }

                // jeśli jeden negatywny stan występuje min 3 razy a drugi max 1 - 
                // - ustaw najczęściej występujący negatywny
                if ((nBored >= 3 && nFrust <= 1)) {
                    emoStateNow = EmoState.BORED;
                    keepLooking = false;
                }
                else if ((nFrust >= 3 && nBored <= 1)) {
                    emoStateNow = EmoState.FRUSTRATED;
                    keepLooking = false;
                }

                // jeśli jest mniej pozytywnych niż 3 - ustaw 'frustrację' 
                // (to da dystraktor 'reward', który jest bezpieczny również przy znudzeniu)
                else if (nOk < 3) {
                    emoStateNow = EmoState.FRUSTRATED;
                    keepLooking = false;
                }
            }

            // w innych przypadkach - stan jest nieustalony
            // (to spowoduje, że nie zostanie wysłany dystraktor, bo nie wiadomo jaki ma być)
            if (keepLooking)
                emoStateNow = EmoState.UNDEFINED;



            // wybór DYSTRAKTORA ......................................................
            if (emoStateNow == EmoState.UNDEFINED || emoStateNow == EmoState.OK)
                return null;

            DistractorType distrType;
            if (emoStateNow == EmoState.BORED)
                distrType = DistractorType.KICK;
            else
                distrType = DistractorType.REWARD;

            var distractor = _distractorService.NextDistractor(userId, distrType);
            string states = "";
            lastEmoStates.ForEach(delegate (Pad pad) {
                states += pad.state + ",";
            });
            _logger.Info("Providing a \"" + distrType + "\" distractor for user (" + userId + ") with last emotional states: " + states);

            return DistractorMapper.GetDTO(distractor);
        }


        // ---------------------------------------------------------------------------------------------
        public List<ModuleDTO> ExplainModule(int userId, int moduleId) {

            var user = _userService.GetUserEntity(userId);
            var children = _moduleService.SelectChildren(moduleId);
            List<edumodule> newModules = children.Where(child => !user.edumodule.Contains(child)).ToList();

            if (newModules.Count() == 0)
                return null;

            // Zapamiętanie nowych modułów na liście odwiedzonych przez użytkownika
            foreach (var child in newModules)
                child.user.Add(user);
            _moduleRepository.SaveChanges();

            // Przekazanie listy modułów wyjaśniających moduł nadrzędny
            return newModules.GetSimpleDTOList();
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleAndDistractorDTO PrevModule(int userId, int currentModuleId) {

            user user = _userService.GetUserEntity(userId);
            distractor newDistractor = null;

            // pobranie listy modułów dotychczas wysłanych do tego użytkownika
            List<edumodule> prevModules = user.edumodule.ToList();
            ModuleService.SortGroupPosition(ref prevModules);

            // ustalenie pozycji aktualnego modułu na liście obejrzanych modułów
            int idx = prevModules.FindIndex(mod => mod.id == currentModuleId);

            if (idx > 0)
                return new ModuleAndDistractorDTO() {
                    module = _moduleService.GetDTOWithQuestions(prevModules[idx - 1], userId),
                    distractor = newDistractor == null ? null : DistractorMapper.GetDTO(newDistractor)
                };

            return null;
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleAndDistractorDTO NextModule(int userId, int currentModuleId) {

            edumodule newModule;
            distractor newDistractor = null;
            user user = _userService.GetUserEntity(userId);


            // pobranie listy modułów dotychczas wysłanych do tego użytkownika
            List<edumodule> prevModules = user.edumodule.ToList();
            ModuleService.SortGroupPosition(ref prevModules);


            // jeśli kolejny moduł będzie wysłany po raz pierwszy - zostanie 
            // dopisany do modułów tego użytkownika
            var addToUserModules = true;


            // To jest PIERWSZY moduł pobierany przez tego użytkownika
            if (prevModules.Count() == 0)
                newModule = _moduleRepository.Get(1);


            // To już nie pierwszy lecz KOLEJNY moduł
            else {

                var difficultyAndDistractor = PickNextDiffAndDistract(userId);

                // ustalenie pozycji aktualnego modułu na liście obejrzanych modułów
                int idx = prevModules.FindIndex(mod => mod.id == currentModuleId);


                // aktualnie użytkownik ogląda któryś z wczesniej pobranych 
                // => pobranie następnego, który oglądał po aktualnym
                if (idx < prevModules.Count() - 1 && idx > -1) {
                    newModule = prevModules[idx + 1];
                    addToUserModules = false;
                }

                // aktualnie użytkownik ogląda ostatni z pobranych =>
                // dostosowanie trudności do stanu emocjonalnego i dotychczasowych wyników użytkownika
                else {
                    //var lastModuleId = prevModules[prevModules.Count() - 1].id;
                    //var nextDifficulty = difficultyAndDistractor.Item1;
                    //newModule = PickNextModule(lastModuleId, nextDifficulty);
                    var nextDifficulty = difficultyAndDistractor.Item1;
                    newModule = PickNextModule(currentModuleId, nextDifficulty);
                }

                // pobranie następnego dystraktora (distractorService sprawdzi czy już można)
                var nextDistractorType = difficultyAndDistractor.Item2;
                newDistractor = _distractorService.NextDistractor(userId, nextDistractorType);


                // TODO: zaktualizowanie stanu gry, itd
            }

            // zapisanie kolejnego modułu na liście wysłanych użytkownikowi
            // oraz zapamiętanie nowego ostatniego modułu użytkownika
            if (addToUserModules && newModule != null) {
                user.edumodule.Add(newModule);
                user.last_module = newModule.id;
                _userService.SaveChanges();
            }

            // Dopisanie kolejnego dystraktora na liście wysłanych użytkownikowi
            // lub zaktualizowanie timestamp z chwili jego wysłania, jesli jest wysyłany
            // po raz kolejny.
            if (newDistractor != null)
                _distractorService.UpsertUserDistractor(user, newDistractor);


            return new ModuleAndDistractorDTO() {
                module = newModule == null ? null : _moduleService.GetDTOWithQuestions(newModule, userId),
                distractor = newDistractor == null ? null : DistractorMapper.GetDTO(newDistractor)
            };
        }


        // PRIVATE
        // =============================================================================================
        /* 1. sprawdzenie stanu emocjonalnego i dotychczasowych wyników użytkownika
         * 2. sprawdzenie dotychczasowych wyników 
         * 3. decyzja czy następny moduł ma być łatwiejszy, trudniejszy, czy taki sam
         *    plus typ dystraktora do wysłania, jeżeli ma być wysłany
         */
        private Tuple<ChangeDifficulty, DistractorType> PickNextDiffAndDistract(int userId) {

            // TODO: sprawdzenie stanu emocjonalnego
            var emoState = EmoServiceController._emoState;

            // próg wyników, powyżej którego można utrudnić materiał
            var resultsTresholdStr = ConfigurationManager.AppSettings["resultsDiffTreshold"];
            var resultsTreshold = Int32.Parse(resultsTresholdStr);

            // sprawdzenie ostatnich wyników testów
            var recentTestScore = _quizService.GetRecentResults(userId);
            var noResults = recentTestScore == -1;
            var highResults = recentTestScore >= resultsTreshold;



            ChangeDifficulty changeDifficulty;
            DistractorType distractorType;



            // OPTYMALNY stan emocjonalny ...............................................
            changeDifficulty = ChangeDifficulty.NO_CHANGE;
            distractorType = DistractorType.NO_DISTRACTOR;


            // ZNUDZONY stan emocjonalny ................................................
            if (emoState == EmoState.BORED) {

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
            else if (emoState == EmoState.FRUSTRATED) {

                // wyniki były niskie
                if (!highResults || noResults)
                    changeDifficulty = ChangeDifficulty.DOWN;

                // wyniki były wysokie
                else
                    changeDifficulty = ChangeDifficulty.NO_CHANGE;

                distractorType = DistractorType.REWARD;
            }
            _logger.Info("Difficulty " + changeDifficulty + " based on " + recentTestScore + " score and emotional state " + emoState);

            // decyzja
            return Tuple.Create(changeDifficulty, distractorType);
        }


        // ---------------------------------------------------------------------------------------------
        /* Pobranie następnego modułu o wymaganym poziomie trudności (ten sam | up | down).
         * Jeżeli nie da się zmienić poziomu w żądanym kierunku - na tym samym poziomie.
         * Jeżeli to ostatni moduł materiału - zwraca null.
         */
        private edumodule PickNextModule(int lastModuleId, ChangeDifficulty change) {

            edumodule newModule = null;
            edumodule lastModule = _moduleRepository.Get(lastModuleId);

            // ustalenie aktualnego poziomu trudności
            var difficultyNow = lastModule.difficulty;


            // ustalenie czy można poziom zmienić
            bool noWayUp = (change == ChangeDifficulty.UP && difficultyNow == "hard");
            bool noWayDown = (change == ChangeDifficulty.DOWN && difficultyNow == "easy");

            if (noWayUp || noWayDown)
                change = ChangeDifficulty.NO_CHANGE;


            // TODO: uporządkować przypadek parent == null - nie może występować
            // pobranie rodzeństwa bieżącego modułu
            int? parentId = lastModule.parent;
            var siblings = _moduleService.SelectChildren(parentId);


            // wykluczenie modułów nie przypisanych do żadnego nadrzędnego, 
            // które powinny mieć rodzica (czyli na poziomie niższym niz "hard")
            siblings = siblings.Where(s => (s.parent != null || s.difficulty == "hard")).ToList();
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
                    newModule = _moduleService.SelectChildren(brother.id)[0];
                }

                // nie ma więcej modułów - ten był ostatni
                else if (lastModule.difficulty == "hard" || parentId == null || parentId == 0)
                    newModule = null;


                // pobranie dziecka najbliższego kuzyna
                else {
                    var cousin = PickNextModule(parentId ?? 0, ChangeDifficulty.DOWN);
                    newModule = (cousin == null) ? null : _moduleService.SelectChildren(cousin.id)[0];
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
            if (newModule != null)
            {
                _logger.Info("Picked " + newModule.title + " as next module");
            } else
            {
                _logger.Info("No new module picked");
            }

            return newModule;
        }


        // ---------------------------------------------------------------------------------------------
        private int countEasiestChildren(edumodule module) {
            if (module.difficulty == "easy")
                return 1;
            else {
                int n = 0;
                foreach (var child in _moduleService.SelectChildren(module.id))
                    n += countEasiestChildren(child);
                return n;
            }
        }
    }
}
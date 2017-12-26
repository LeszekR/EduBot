﻿using System;
using System.Linq;
using System.Configuration;
using System.Collections.Generic;
using EduApi.Services.Interfaces;
using EduApi.Controllers;
using EduApi.DAL.Interfaces;
using EduApi.DTO;
using EduApi.Dto;
using EduApi.Dto.Mappers;

namespace EduApi.Services {


    // =================================================================================================
    public enum EmoState { BORED, FRUSTRATED, OK, UNDEFINED };
    public enum ChangeDifficulty { UP, NO_CHANGE, DOWN };
    public enum DistractorType { NO_DISTRACTOR, KICK, REWARD };


    // =================================================================================================
    public class EduAlgorithmService : IEduAlgorithmService {

        private readonly IModuleRepository _moduleRepository;
        private readonly IModuleService _moduleService;
        private readonly IUserService _userService;
        private readonly ITestQuestionService _questionService;
        private readonly IDistractorService _distractorService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public EduAlgorithmService(
            IModuleRepository moduleRepository,
            IModuleService moduleService,
            IUserService userService,
            ITestQuestionService questionService,
            IDistractorService distractorService
            ) {

            _moduleRepository = moduleRepository;
            _moduleService = moduleService;
            _userService = userService;
            _questionService = questionService;
            _distractorService = distractorService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public DistractorDTO KickTheStudent(List<Pad> lastEmoStates) {

            if (lastEmoStates.Count() < 5)
                return null;



            // ustalenie STANU EMOCJONALNEGO ..........................................
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
                var ok2 = lastEmoStates[2].state;
                var ok3 = lastEmoStates[3].state;

                if (ok2 == ok3) {
                    emoStateNow = ok2;
                    keepLooking = false;
                }
            }

            // jeśli max 2 emostany są pozytywne - ustaw 'frustrację' 
            // (to da dystraktor 'reward', który jest bezpieczny również przy znudzeniu)
            if (keepLooking) {
                var nOk = 0;
                foreach (var emo in lastEmoStates)
                    if (emo.state == EmoState.OK)
                        nOk++;
                if (nOk <= 2) {
                    emoStateNow = EmoState.FRUSTRATED;
                    keepLooking = false;
                }
            }

            // w innych przypadkach - ustaw 'ok', ponieważ stan jest nieustalony
            // (to spowoduje, że nie zostanie wysłany dystraktor, bo nie wiadomo jaki ma być)
            if (keepLooking)
                emoStateNow = EmoState.UNDEFINED;



            // wybór DYSTRAKTORA ......................................................

            // jeżeli emostan jest 'ok' - zwróc null
            if (emoStateNow == EmoState.UNDEFINED || emoStateNow == EmoState.OK)
                return null;

            // wybierz dystraktor odpowiedni do emostanu
            else
                return _distractorService.NextDistractor(userId, e)


            // TODO : zaimplementować zamiast mock'a
            return new DistractorDTO() { distr_content = "dystraktorek na próbę" };
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
                    module = ModuleMapper.GetDTO(prevModules[idx - 1]),
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
                    var lastModuleId = prevModules[prevModules.Count() - 1].id;
                    var nextDifficulty = difficultyAndDistractor.Item1;
                    newModule = PickNextModule(lastModuleId, nextDifficulty);
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
                module = newModule == null ? null : ModuleMapper.GetDTO(newModule),
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
            var recentTestScore = _questionService.GetRecentResults(userId);
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


            // TODO: uporządkować przypadek group_id == null - nie może występować
            // pobranie rodzeństwa bieżącego modułu
            int? parentId = lastModule.group_id;
            var siblings = _moduleService.SelectChildren(parentId);


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

            return newModule;
        }
    }
}
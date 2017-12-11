using EduApi.Controllers;
using EduApi.DAL;
using EduApi.DAL.Interfaces;
using EduApi.Dto;
using EduApi.Dto.Mappers;
using EduApi.DTO;
using EduApi.Repositories.Interfaces;
using EduApi.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;


/* source: 
 * https://stackoverflow.com/questions/10960131/authentication-authorization-and-session-management-in-traditional-web-apps-and
 * 
 * 1. give the client an identifier, be it via a Set-Cookie HTTP response header, 
 * inside the response body (XML/JSON auth response).
 * 
 * 2. have a mechanism to maintain identifier/client association, for example 
 * a database table that associates identifier 00112233445566778899aabbccddeeff 
 * with client/user #1337.
 * 
 * 3. have the client resend the identifier sent to it at (1.) in all subsequent requests, 
 * be it in an HTTP Cookie request header, a ?sid=00112233445566778899aabbccddeeff param(*).
 * 
 * 4. lookup the received identifier, using the mechanism at (2.), check if a valid 
 * authentication, and is authorized to do requested operation, and then proceed 
 * with the operation on behalf on the auth'd user.
 */


namespace EduApi.Services {

    // =================================================================================================
    public class ModuleService : IModuleService {

        private readonly IModuleRepository _moduleRepository;
        private readonly ITestQuestionService _questionService;
        private readonly IUserService _userService;

        public enum ChangeDifficulty { UP, NO_CHANGE, DOWN };


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public ModuleService(
            IModuleRepository moduleRepository,
            ITestQuestionService questionService,
            IUserService userService) {

            _moduleRepository = moduleRepository;
            _questionService = questionService;
            _userService = userService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public void CreateModuleSequence() {
            List<edumodule> modules = TreeModules(_moduleRepository.All());
            for (var i = 0; i < modules.Count(); i++)
                modules[i].group_position = i;
            _moduleRepository.SaveChanges();
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO PrevModule(int userId, int currentModuleId) {
            throw new NotImplementedException();
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO NextModule(int userId, int currentModuleId) {


            edumodule newModule;
            user user = _userService.GetUserEntity(userId);


            // pobranie listy modułów dotychczas wysłanych do tego użytkownika
            List<edumodule> prevModules = user.edumodule.ToList();
            SortGroupPosition(ref prevModules);

            var saveLastModule = true;


            // To jest PIERWSZY moduł pobierany przez tego użytkownika
            if (prevModules.Count() == 0)
                newModule = _moduleRepository.Get(1);


            // To już nie pierwszy lecz KOLEJNY moduł
            else {

                // ustalenie pozycji aktualnego modułu na liście obejrzanych modułów
                int idx = prevModules.FindIndex(mod => mod.id == currentModuleId);


                // aktualnie użytkownik ogląda któryś z wczesniej pobranych 
                // => pobranie następnego, który oglądał po aktualnym
                if (idx < prevModules.Count() - 1 && idx > -1) {
                    newModule = prevModules[idx + 1];
                    saveLastModule = false;
                }


                // aktualnie użytkownik ogląda ostatni z pobranych =>
                // dostosowanie trudności do stanu emocjonalnego i dotychczasowych wyników użytkownika
                else {
                    var nextDifficulty = PickNextDifficulty(userId);
                    newModule = PickNextModule(currentModuleId, nextDifficulty);
                }

                // TODO: sprawdzenie czy należy wysłać dystraktor
                // TODO: wysłanie dystraktora
                // TODO: zaktualizowanie stanu gry, itd
            }

            // zapisanie kolejnego modułu na liście wysłanych użytkownikowi
            // oraz zapamiętanie nowego ostatniego modułu użytkownika
            if (saveLastModule && newModule != null) {
                user.edumodule.Add(newModule);
                user.last_module = newModule.id;
                _userService.SaveChanges();
            }

            if (newModule == null)
                return null;

            return ModuleMapper.GetDTO(newModule);
        }


        // ---------------------------------------------------------------------------------------------
        public List<ModuleDTO> GetSimpleModules() {
            List<edumodule> modules = _moduleRepository.All();
            SortGroupPosition(ref modules);
            return modules.GetSimpleDTOList();

            // pobranie danych z bazy
            //List<edumodule> modules = _moduleRepository.All();
            //List<edumodule> sortedModules = TreeModules(modules);
            //return sortedModules.GetSimpleDTOList();
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO GetModule(int id) {
            edumodule module = _moduleRepository.Get(id);
            ModuleDTO moduleDTO = ModuleMapper.GetDTO(module);
            moduleDTO.test_question = GetQuestionsForModule(module);
            return moduleDTO;
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO UpsertModule(ModuleDTO moduleReceived) {

            var id = moduleReceived.id;
            edumodule module;

            // zapisanie nowego modułu lub zmian istniejącego
            if (id == 0) {
                module = new edumodule();
                ModuleMapper.CopyValues(moduleReceived, module);
                _moduleRepository.Add(module);
            }
            else {
                module = _moduleRepository.Get(id);
                _moduleRepository.SetNewValues(moduleReceived, module);
            }

            // zapisanie lub odświeżenie pytań przypisanych do modułu
            if (moduleReceived.test_question != null)
                foreach (var new_question in moduleReceived.test_question)
                    _questionService.UpsertQuestion(new_question);


            // usunięcie pytań przysłanych w tablicy 'remove_question'
            if (moduleReceived.remove_question != null)
                foreach (var rm_question_id in moduleReceived.remove_question)
                    _questionService.DeleteQuestion(rm_question_id);


            return ModuleMapper.GetDTO(module);
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO NewMetaModule(ModuleDTO[] moduleGroup) {

            // sortowanie otrzymanych modułów w kolejności id
            List<ModuleDTO> moduleList = new List<ModuleDTO>(moduleGroup);
            moduleList.Sort((a, b) => (a.id > b.id ? 1 : -1));


            // połączenie treści, przykładów i - jeżeli jest - testów z kodu modułów podrzędnych
            edumodule newModule = new edumodule();
            string content = "";
            string example = "";

            ModuleDTO moduleDTO;
            for (var i = 0; i < moduleList.Count; i++) {
                moduleDTO = moduleList[i];
                content += "\n\n" + moduleDTO.content;
                example += "\n\n" + moduleDTO.example;
            }
            newModule.content = content.Substring(2);
            newModule.example = example.Substring(2);

            newModule.difficulty = moduleGroup[0].difficulty == "easy" ? "medium" : "hard";
            newModule.title = "<podaj tytuł>";


            // zapisanie nowego nadrzędnego modułu w bazie danych
            _moduleRepository.Add(newModule);

            // zmiana id_grupy wszystkich modułów podrzędnych na id nowo utworzonego modułu
            edumodule childModule;
            foreach (var child in moduleGroup) {
                childModule = _moduleRepository.Get(child.id);
                childModule.group_id = newModule.id;
                _moduleRepository.SaveChanges();
            }

            // wysłanie do frontu nowo utworzonego modułu
            return ModuleMapper.GetDTO(newModule);
        }


        // ---------------------------------------------------------------------------------------------
        public List<ModuleDTO> DeleteModule(int id) {

            // usunięcie z grupy dzieci (modułów) usuwanego modułu
            edumodule mod = _moduleRepository.Get(id);
            if (mod.difficulty != "easy") {

                List<edumodule> children = _moduleRepository.SelectChildren(id);
                foreach (var child in children)
                    child.group_id = null;

                _moduleRepository.SaveChanges();
            }

            // usunięcie z bazy pytań przypisanych do usuwanego modułu, jesli to moduł 'easy'
            else {
                List<test_question> questions = _questionService.SelectQuestionsForModule(id);
                foreach (var child in questions)
                    _questionService.DeleteQuestion(child.id);
            }

            // usunięcie modułu
            _moduleRepository.Delete(id);

            return GetSimpleModules();
        }


        // PRIVATE
        // =============================================================================================
        /* 1. sprawdzenie stanu emocjonalnego i dotychczasowych wyników użytkownika
         * 2. sprawdzenie dotychczasowych yników 
         * 3. decyzja czy następny moduł ma być łatwiejszy, trudniejszy, czy taki sam
         */
        private ChangeDifficulty PickNextDifficulty(int userId) {

            // TODO: sprawdzenie stanu emocjonalnego i dotychczasowych wyników użytkownika
            // TODO: sprawdzenie dotychczasowych yników 
            // TODO: dostosowanie trudności modułu do emocji i wyników

            var emoState = EmoServiceController._emoState;

            ChangeDifficulty change = ChangeDifficulty.NO_CHANGE;

            if (emoState == EmoServiceController.EmoState.BORED)
                change = ChangeDifficulty.UP;
            else if (emoState == EmoServiceController.EmoState.FRUSTRATED)
                change = ChangeDifficulty.DOWN;

            return change;
        }


        // ---------------------------------------------------------------------------------------------
        /* Pobranie następnego modułu o wymaganym poziomie trudności (ten sam | up | down).
         * Jeżeli nie da się zmienić poziomu w żądanym kierunku - na tym samym poziomie.
         * Jeżeli to ostatni moduł materiału - zwraca null.
         */
        private edumodule PickNextModule(int currentModuleId, ModuleService.ChangeDifficulty change) {

            edumodule newModule = null;
            edumodule currentModule = _moduleRepository.Get(currentModuleId);

            // ustalenie aktualnego poziomu trudności
            var difficultyNow = currentModule.difficulty;


            // ustalenie czy można poziom zmienić
            bool noWayUp = (change == ChangeDifficulty.UP && difficultyNow == "hard");
            bool noWayDown = (change == ChangeDifficulty.DOWN && difficultyNow == "easy");

            if (noWayUp || noWayDown)
                change = ChangeDifficulty.NO_CHANGE;


            // TODO: uporządkować przypadek group_id == null - nie może występować
            // pobranie rodzeństwa bieżącego modułu
            int? parentId = currentModule.group_id;
            var siblings = _moduleRepository.SelectChildren(parentId);


            // wykluczenie modułów nie przypisanych do żadnego nadrzędnego, 
            // które powinny mieć rodzica (czyli na poziomie niższym niz "hard")
            siblings = siblings.Where(s => (s.group_id != null || s.difficulty == "hard")).ToList();
            SortGroupPosition(ref siblings);


            // ustalenie czy to ostatnie dziecko
            int idxChild = siblings.FindIndex(mod => mod.id == currentModuleId);
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
                else if (currentModule.difficulty == "hard" || parentId == null || parentId == 0)
                    newModule = null;


                // pobranie dziecka najbliższego kuzyna
                else {
                    var cousin = PickNextModule(parentId ?? 0, ChangeDifficulty.DOWN);
                    newModule = (cousin == null) ? null : _moduleRepository.SelectChildren(cousin.id)[0];
                }
            }


            // PODNIESIENIE POZIOMU TRUDNOŚCI - podanie kolejnego modułu w wersji trudniejszej
            // pod warunkiem, że aktualny moduł był ostatnim dzieckiem swojego rodzica
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


        // ---------------------------------------------------------------------------------------------
        private List<TestQuestionDTO> GetQuestionsForModule(edumodule module) {

            List<TestQuestionDTO> questions = new List<TestQuestionDTO>();
            IEnumerable<test_question> questionsData = null;

            // pytania dla modułu 'easy'
            if (module.difficulty == "easy") {
                questionsData = _questionService.SelectQuestionsForModule(module.id);
                questions = TestQuestionMapper.GetListDTO(questionsData);
            }

            // pytania dla modułów 'medium' i 'hard' - rekurencyjnie
            else {
                var children = _moduleRepository.SelectChildren(module.id);
                children.ForEach(child => {
                    questions.AddRange(GetQuestionsForModule(child));
                });
            }

            return questions;
        }


        // ---------------------------------------------------------------------------------------------
        private int SortModules(ModuleDTO a, ModuleDTO b) {
            if (a.group_position != b.group_position)
                return a.group_position > b.group_position ? 1 : -1;
            return a.id > b.id ? 1 : -1;
        }


        // ---------------------------------------------------------------------------------------------
        private void SortGroupPosition(ref List<edumodule> modules) {
            modules.Sort((a, b) => a.group_position > b.group_position ? 1 : -1);
        }


        // ---------------------------------------------------------------------------------------------
        /* Ustawia tablicę nieuporządkowaną modułów w drzewo posortowane wg kolejności podawania materiału */
        private List<edumodule> TreeModules(List<edumodule> modules) {

            List<edumodule> sortedModules = new List<edumodule>();
            List<edumodule> foundModules;

            foundModules = modules.Where(m => m.difficulty == "hard").ToList();
            if (foundModules.Count() == 0) {
                foundModules = modules.Where(m => m.difficulty == "medium").ToList();
                if (foundModules.Count() == 0)
                    foundModules = modules.Where(m => m.difficulty == "easy").ToList();
            }
            CreateModuleTree(foundModules, ref modules, ref sortedModules);

            // dodanie modułów nie przypisanych do żadnego nadrzędnego
            sortedModules.AddRange(modules.Except(sortedModules));

            return sortedModules;
        }


        // ---------------------------------------------------------------------------------------------
        private void CreateModuleTree(List<edumodule> foundModules, ref List<edumodule> modules, ref List<edumodule> sortedModules) {

            foundModules.Sort((a, b) => ModuleRepository.SortModules(a, b));
            List<edumodule> children;

            foreach (var mod in foundModules) {
                sortedModules.Add(mod);

                children = modules.Where(child => child.group_id == mod.id).ToList();
                if (children.Count() > 0)
                    CreateModuleTree(children, ref modules, ref sortedModules);
            }
        }
    }
}
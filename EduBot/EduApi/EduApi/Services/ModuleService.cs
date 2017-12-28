using EduApi.DAL;
using EduApi.DAL.Interfaces;
using EduApi.Dto;
using EduApi.Dto.Mappers;
using EduApi.DTO;
using EduApi.Services.Interfaces;
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
        private readonly IUserService _userService;
        private readonly ITestQuestionService _questionService;
        //private readonly IDistractorService _distractorService;
        //private readonly IEduAlgorithmService _eduAlgorithmService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public ModuleService(
            IModuleRepository moduleRepository,
            IUserService userService,
            ITestQuestionService questionService
            //IDistractorService distractorService,
            //IEduAlgorithmService eduAlgorithmService
            ) {

            _moduleRepository = moduleRepository;
            _userService = userService;
            _questionService = questionService;
            //_distractorService = distractorService;
            //_eduAlgorithmService = eduAlgorithmService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public List<edumodule> SelectChildren(int? id_grupy) {
            var modules = _moduleRepository.All().Where(mod => mod.group_id == id_grupy).ToList();
            modules.Sort((a, b) => SortModules(a, b));
            return modules;
        }

        // ---------------------------------------------------------------------------------------------
        public List<ModuleDTO> GetSimpleModules(int userId) {

            //List<edumodule> modules = _moduleRepository.ModulesOfUser(userId);
            var user = _userService.GetUserEntity(userId);
            List<edumodule> modules = user.edumodule.ToList();

            // Jeżeli użytkownik jeszcze nie pobrał żadnych modułów - otrzyma pierwszy
            // w którym powinien byc wstęp - instrukcja używania programu.
            if (modules.Count() == 0) {

                var introductionModule = _moduleRepository.Get(1);
                modules.Add(introductionModule);

                // zapisanie modułu na liście modułów użytkownika
                //var user = _userService.GetUserEntity(userId);
                user.edumodule.Add(introductionModule);
                _userService.SaveChanges();
            }

            // Jeżeli użytkownik już otrzymał jakieś moduły - sortujemy ich kolejność
            else
                SortGroupPosition(ref modules);

            return modules.GetSimpleDTOList();
        }


        // ---------------------------------------------------------------------------------------------
        public List<ModuleDTO> GetSimpleModules() {
            List<edumodule> modules = _moduleRepository.All();
            SortGroupPosition(ref modules);
            return modules.GetSimpleDTOList();
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
            List<test_question> oldQuestions = null;

            // utworzenie nowego modułu lub pobranie istniejącego
            if (id == 0) {
                module = new edumodule();
                ModuleMapper.CopyValues(moduleReceived, module);
                _moduleRepository.Add(module);
            }
            else {
                module = _moduleRepository.Get(id);
                _moduleRepository.SetNewValues(moduleReceived, module);
                oldQuestions = module.test_question.ToList();
            }

            // usunięcie pytań, których nie ma w tablicy z nowymi pytaniami
            var newQuestions = moduleReceived.test_question;

            foreach (var oldQ in oldQuestions)
                if (newQuestions == null)
                    _questionService.DeleteQuestion(oldQ.id);
                else if (!newQuestions.Exists(newQ => newQ.id == oldQ.id))
                    _questionService.DeleteQuestion(oldQ.id);

            // zapisanie nowych i odświeżenie starych pytań przypisanych do modułu
            if (moduleReceived.test_question != null && moduleReceived.difficulty == "easy")
                foreach (var new_question in moduleReceived.test_question)
                    _questionService.UpsertQuestion(new_question);


            return ModuleMapper.GetDTO(module);
        }


        // ---------------------------------------------------------------------------------------------
        public List<ModuleDTO> NewMetaModule(ModuleDTO[] moduleGroup) {

            // sortowanie otrzymanych modułów w kolejności id
            List<ModuleDTO> moduleList = new List<ModuleDTO>(moduleGroup);
            moduleList.Sort((a, b) => (a.id > b.id ? 1 : -1));
            //moduleList.Sort(SortModules);


            // połączenie treści, przykładów i - jeżeli jest - testów z kodu modułów podrzędnych
            edumodule newModule = new edumodule();
            string content = "";
            string example = "";

            edumodule child;
            var children = new List<edumodule>();
            for (var i = 0; i < moduleList.Count; i++) {
                child = _moduleRepository.Get(moduleList[i].id);
                content += "\n\n" + child.content;
                example += "\n\n" + child.example;
                children.Add(child);
            }

            // zapisanie nowego nadrzędnego modułu w bazie danych
            newModule.content = content.Substring(2);
            newModule.example = example.Substring(2);
            newModule.difficulty = moduleGroup[0].difficulty == "easy" ? "medium" : "hard";
            newModule.title = "<podaj tytuł>";
            newModule.group_position = 2000000000;
            _moduleRepository.Add(newModule);


            // zmiana id_grupy wszystkich modułów podrzędnych na id nowo utworzonego modułu
            foreach (var childReady in children)
                childReady.group_id = newModule.id;
            _moduleRepository.SaveChanges();


            // odświeżenie sekwencji modułów
            CreateModuleSequence();

            // wysłanie do frontu nowo utworzonego modułu
            //return ModuleMapper.GetDTO(newModule);
            return GetSimpleModules();
        }


        // ---------------------------------------------------------------------------------------------
        public List<ModuleDTO> DeleteModule(int id) {

            // usunięcie z grupy dzieci (modułów) usuwanego modułu
            edumodule mod = _moduleRepository.Get(id);
            if (mod.difficulty != "easy") {

                List<edumodule> children = SelectChildren(id);
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


            // odświeżenie sekwencji modułów
            CreateModuleSequence();

            return GetSimpleModules();
        }


        // ---------------------------------------------------------------------------------------------
        /* Sortuje moduły wg
         * 1. group_position
         * 2. jeżeli group_position == null - wówczas wg id
         * Atrybut group_position jest ustawiany w metodzie ModuleService.CreateModuleSequence po 
         * każdym zakończeniu edycji modułów.
         */
        public static void SortGroupPosition(ref List<edumodule> modules) {
            modules.Sort((a, b) => a.group_position > b.group_position ? 1 : -1);
        }


        // PRIVATE
        // =============================================================================================
        private List<TestQuestionDTO> GetQuestionsForModule(edumodule module) {

            List<TestQuestionDTO> questions = new List<TestQuestionDTO>();
            IEnumerable<test_question> questionsData = null;

            // pytania dla modułu 'easy'
            if (module.difficulty == "easy") {
                questionsData = _questionService.SelectQuestionsForModule(module.id);
                questions = TestQuestionMapper.GetQuestionListDTO(questionsData);
            }

            // pytania dla modułów 'medium' i 'hard' - rekurencyjnie
            else {
                var children = SelectChildren(module.id);
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
        public static int SortModules(edumodule a, edumodule b) {
            if (a.group_position != b.group_position)
                return a.group_position > b.group_position ? 1 : -1;
            return a.id > b.id ? 1 : -1;
        }


        // PRIVATE
        // =============================================================================================
        /* Ustawia wszystkie moduły w prawidłowe drzewo i numeruje (nadaje im kolejne 'group_position').
         * Dzięki temu przy dalszym korzystaniu można sortować moduły:
         * - szybko
         * - również gdy lista jest niekompletna (nieznani są rodzice) 
         */
        private void CreateModuleSequence() {
            List<edumodule> modules = TreeModules(_moduleRepository.All());
            for (var i = 0; i < modules.Count(); i++)
                modules[i].group_position = i;
            _moduleRepository.SaveChanges();
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

            // posortowanie i dodanie pozostałych modułów - które nie zostały
            // przypisanych do żadnego nadrzędnego, ponieważ nie mają rodzica, lub 
            // ich rodzic jest na niższym poziomie trudności niż poziom ustaloony powyżej w foundModules
            var leftModules = modules.Except(sortedModules).ToList();
            if (leftModules.Count() > 0)
                sortedModules.AddRange(TreeModules(leftModules));

            return sortedModules;
        }


        // ---------------------------------------------------------------------------------------------
        private void CreateModuleTree(
            List<edumodule> foundModules,
            ref List<edumodule> modules,
            ref List<edumodule> sortedModules) {

            foundModules.Sort((a, b) => SortModules(a, b));
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
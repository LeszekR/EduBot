using EduApi.DAL.Interfaces;
using EduApi.Dto;
using EduApi.Dto.Mappers;
using EduApi.DTO;
using EduApi.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;


namespace EduApi.Services {


    // =================================================================================================
    public class ModuleService : IModuleService {

        private readonly IModuleRepository _moduleRepository;
        private readonly IUserService _userService;
        private readonly ITestQuestionService _questionService;
        private readonly ITestCodeService _codeService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public ModuleService(
            IModuleRepository moduleRepository,
            IUserService userService,
            ITestQuestionService questionService,
            ITestCodeService codeService
            ) {

            _moduleRepository = moduleRepository;
            _userService = userService;
            _questionService = questionService;
            _codeService = codeService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public string FillMetaModules() {

            string[] stopnie = { "medium", "hard" };

            List<edumodule> modules;
            ModuleDTO[] children;

            for (int i = 0; i < 2; i++) {

                // pobranie wszystkich modułów na danym stopniu trudności
                modules = _moduleRepository.All().Where(m => m.difficulty == stopnie[i]).ToList();

                // wypełnienie modułu nadrzędnego treścią jego dzieci
                foreach (var module in modules) {
                    children = module.edumodule1
                        .ToList()
                        .Select(child => ModuleMapper.GetDTO(child))
                        .ToArray();
                    FillMetaModule(children, module);
                }
            }

            return "Automatycznie wypełniono meta moduły zawartością ich dzieci";
        }


        // ---------------------------------------------------------------------------------------------
        public List<edumodule> SelectChildren(int? parentId) {
            var modules = _moduleRepository.All().Where(mod => mod.parent == parentId).ToList();
            modules.Sort((a, b) => SortModules(a, b));
            return modules;
        }


        // ---------------------------------------------------------------------------------------------
        public List<ModuleDTO> GetSimpleModules(int userId) {

            //List<edumodule> modules = _moduleRepository.ModulesOfUser(userId);
            var user = _userService.GetUserEntity(userId);
            List<edumodule> modules = user.edumodule.ToList();

            // Jeżeli użytkownik jeszcze nie pobrał żadnych modułów - otrzyma pierwszy
            if (modules.Count() == 0) {

                var introductionModule = _moduleRepository.Get(1);
                modules.Add(introductionModule);

                // zapisanie modułu na liście modułów użytkownika
                user.edumodule.Add(introductionModule);
                _userService.SaveChanges();
            }

            // Jeżeli użytkownik już otrzymał jakieś moduły - sortujemy ich kolejność
            else
                SortGroupPosition(ref modules);



            // Zapisanie dla których modułów użytkownik zaliczył wszystkie pytania testu.
            var passedQuests = user.user_question
                .Where(uq => uq.last_result == true)
                .Select(uq => uq.test_question)
                .ToList();

            // Ustalenie dla których modułów użytkownik zaliczył test z kodu.
            var passedCodes = user.user_code
                .Where(uc => uc.last_result == true)
                .Select(uc => uc.test_code)
                .ToList();

            List<ModuleDTO> moduleListDTO = new List<ModuleDTO>();
            ModuleDTO dto;
            IEnumerable<test_question> moduleQuests;
            IEnumerable<test_code> moduleCodes;

            foreach (var mod in modules) {

                dto = ModuleMapper.GetDTO(mod);

                moduleQuests = QuestionsForModule(mod);

                // this module has no questions
                if (moduleQuests.Count() == 0)
                    dto.solvedQuestions = true;

                // the user has not answered this module's questions yet
                else if (user.user_question.FirstOrDefault(q => moduleQuests.Contains(q.test_question)) == null)
                    dto.solvedQuestions = false;

                // check the latest user's results with this module question test
                else
                    dto.solvedQuestions = moduleQuests.FirstOrDefault(q => !passedQuests.Contains(q)) == null;



                // TODO dokończyć po uzupełnieniu TestCodeMappera
                moduleCodes = CodesForModule(mod);

                // this module has no code test
                if (moduleCodes.Count() == 0)
                    dto.solvedCodes = true;

                // the user has not taken this module's code test yet
                else if (user.user_code.FirstOrDefault(c => moduleCodes.Contains(c.test_code)) == null)
                    dto.solvedCodes = false;

                // check the latest user's results with this module code test
                else
                    dto.solvedCodes = moduleCodes.FirstOrDefault(c => !passedCodes.Contains(c)) == null;

                moduleListDTO.Add(dto);
            }


            return moduleListDTO;
        }


        // ---------------------------------------------------------------------------------------------
        public List<ModuleDTO> GetSimpleModules() {
            List<edumodule> modules = _moduleRepository.All();
            SortGroupPosition(ref modules);
            return modules.GetSimpleDTOList();
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO GetModuleLearn(int id, int userId) {
            edumodule module = _moduleRepository.Get(id);
            return GetDTOWithQuestions(module, userId);
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO GetModuleEdit(int id) {
            edumodule module = _moduleRepository.Get(id);
            return GetDTOWithQuestions(module, -1);
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO GetDTOWithQuestions(edumodule module, int userId) {

            ModuleDTO moduleDTO = ModuleMapper.GetDTO(module);
            List<TestQuestionDTO> questionDtosOfModule = QuestionDtosForModule(module);
            List<TestCodeDTO> codeDtosOfModule = CodeDtosForModule(module);


            // Wersja dla NAUCZYCIELA (do edycji modułów)
            // .........................................................................
            // brak id użytkownika - pytania będą zawierać indeks prawidłowej odpowiedzi
            // - ta wersja potrzebna jest do edycji modułów
            if (userId < 0) {
                moduleDTO.test_questions_DTO = questionDtosOfModule;
                moduleDTO.test_codes_DTO = codeDtosOfModule;
                return moduleDTO;
            }


            // Wersja dla STUDENTA
            // .........................................................................
            // Jest id uzytkownika - 
            // - pytania będą zawierały indeks ostatniej odpowiedzi udzielonej przez użytkownika 
            // - kody będą zawierały kody utworzone przez użytkownika 
            // (zamiana indeksów prawidłowych odpowiedzi na ostatnie odpowiedzi podane przez użytkownika
            // i prawidłowych wyników kodu na kody utworzone przez użytkownika).
            moduleDTO.test_questions_DTO = SetStudentAnswers(userId, questionDtosOfModule);
            moduleDTO.test_codes_DTO = SetStudentCodes(userId, codeDtosOfModule);


            // moduł gotowy do wysłania studentowi
            return moduleDTO;
        }


        // ---------------------------------------------------------------------------------------------
        private List<TestCodeDTO> SetStudentCodes(int userId, List<TestCodeDTO> codeDtosOfModule) {

            // rozbicie stringu code_answer na składniki i dodanie do nich 'id' pytania
            List<List<string>> codesInParts = codeDtosOfModule
                .Select(q => {
                    var code = new List<string>();
                    code.Add(q.id.ToString());
                    code.AddRange(q.task_answer.Split('^'));
                    return code;
                })
                .ToList();

            //// wydobycie odpowiedzi, jakie użytkownik już udzielił na te pytania
            //var codeIds = codeDtosOfModule.Select(q => q.id).ToList();
            //var userCodesAll = _userService.GetUserEntity(userId).user_code.ToList()
            //    .Where(q => codeIds.Contains(q.code_id))
            //    .ToList();
            // wydobycie odpowiedzi, jakie użytkownik już udzielił na te pytania


            //// ustalenie czy użytkownik już odpowiadał na te pytania
            //bool answered = userCodesAll.Count() > 0;


            var userCodesAll = _userService.GetUserEntity(userId).user_code.ToList();


            // zbudowanie z powrotem stringów code_answer zawierających tym razem
            // już nie index prawidłowej odpowiedzi ale indeks ostatniej odpowiedzi
            // udzielonej przez użytkownika
            List<string> parts;
            string lastAnswer;
            bool lastResult;
            user_code userCode;

            foreach (var codeDTO in codeDtosOfModule) {


                // ten moduł już był zaliczany - są wszystkie odpowiedzi
                // (choć mogą być błędne - liczy się tu że była próba odpowiedzi i jest jej wynik)
                //if (answered) {
                //    userCode = userCodesAll.First(q => q.code_id == code.id);
                //    lastAnswer = userCode.last_answer.ToString();
                //    lastResult = userCode.last_result;
                //}

                userCode = userCodesAll.FirstOrDefault(c => c.code_id == codeDTO.id);

                if (userCode != null) {
                    lastAnswer = userCode.last_answer != null ? userCode.last_answer.ToString() : "";
                    lastResult = userCode.last_result;
                }

                // jeżeli te pytanie są nowe dla użytkownika - ustawienie braku odpowiedzi
                else {
                    lastAnswer = "";
                    lastResult = false;
                }

                parts = codesInParts.First(q => Int32.Parse(q[0]) == codeDTO.id);
                codeDTO.task_answer = parts[1] + "^" + parts[2] + "^" + parts[3] + "^" + parts [4] + "^" + parts[5] + "^" + lastAnswer;
                codeDTO.last_result = lastResult;
            }

            return codeDtosOfModule;
        }


        // ---------------------------------------------------------------------------------------------
        private List<TestQuestionDTO> SetStudentAnswers(int userId, List<TestQuestionDTO> questions) {

            // rozbicie stringu question_answer na składniki i dodanie do nich 'id' pytania
            List<List<string>> questionsInParts = questions
                .Select(q => {
                    var question = new List<string>();
                    question.Add(q.id.ToString());
                    question.AddRange(q.question_answer.Split('^'));
                    return question;
                })
                .ToList();

            // wydobycie odpowiedzi, jakie użytkownik już udzielił na te pytania
            var questionIds = questions.Select(q => q.id).ToList();
            var userQuestionAll = _userService.GetUserEntity(userId).user_question.ToList()
                .Where(q => questionIds.Contains(q.question_id))
                .ToList();


            // ustalenie czy użytkownik już odpowiadał na te pytania
            bool answered = userQuestionAll.Count() > 0;


            // zbudowanie z powrotem stringów question_answer zawierających tym razem
            // już nie index prawidłowej odpowiedzi ale indeks ostatniej odpowiedzi
            // udzielonej przez użytkownika
            List<string> parts;
            string lastAnswer;
            bool lastResult;
            user_question userQuestion;

            foreach (var quest in questions) {

                parts = questionsInParts.First(q => Int32.Parse(q[0]) == quest.id);

                // ten moduł już był zaliczany - są wszystkie odpowiedzi
                // (choć mogą być błędne - liczy się tu że była próba odpowiedzi i jest jej wynik)
                if (answered) {
                    userQuestion = userQuestionAll.First(q => q.question_id == quest.id);
                    lastAnswer = userQuestion.last_answer.ToString();
                    lastResult = userQuestion.last_result;
                }

                // jeżeli te pytanie są nowe dla użytkownika - ustawienie braku odpowiedzi
                else {
                    lastAnswer = "-1";
                    lastResult = false;
                }

                quest.question_answer = parts[1] + "^" + lastAnswer + "^" + parts[3];
                quest.last_result = lastResult;
            }

            return questions;
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO UpsertModule(ModuleDTO moduleReceived) {

            var id = moduleReceived.id;
            edumodule module;
            List<test_question> oldQuestions = null;
            List<test_code> oldCodes = null;


            // MODUŁ 
            // ...............................................................
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
                oldCodes = module.test_code.ToList();
            }

            // PYTANIA 
            // ...............................................................
            // usunięcie pytań, których nie ma w tablicy z nowymi pytaniami
            var newQuestions = moduleReceived.test_questions_DTO;

            foreach (var oldQ in oldQuestions)
                if (newQuestions == null)
                    _questionService.DeleteQuestion(oldQ.id);
                else if (!newQuestions.Exists(newQ => newQ.id == oldQ.id))
                    _questionService.DeleteQuestion(oldQ.id);

            // zapisanie nowych i odświeżenie starych pytań przypisanych do modułu
            if (moduleReceived.test_questions_DTO != null && moduleReceived.difficulty == "easy")
                foreach (var new_question in moduleReceived.test_questions_DTO)
                    _questionService.UpsertQuestion(new_question);


            // CODE TASKS 
            // ...............................................................
            // usunięcie zadań z kodu, których nie ma w tablicy z nowymi zadaniami
            var newCodes = moduleReceived.test_codes_DTO;

            foreach (var oldC in oldCodes)
                if (newCodes == null)
                    _codeService.DeleteCode(oldC.id);
                else if (!newCodes.Exists(newC => newC.id == oldC.id))
                    _codeService.DeleteCode(oldC.id);

            // zapisanie nowych i odświeżenie starych pytań przypisanych do modułu
            if (moduleReceived.test_codes_DTO != null && moduleReceived.difficulty == "easy")
                foreach (var new_code in moduleReceived.test_codes_DTO)
                    _codeService.UpsertCode(new_code);



            // RETURN
            // ...............................................................
            return GetDTOWithQuestions(module, -1);
        }


        // ---------------------------------------------------------------------------------------------
        public List<ModuleDTO> NewMetaModule(ModuleDTO[] moduleGroup) {
            return FillMetaModule(moduleGroup, null);
        }


        // ---------------------------------------------------------------------------------------------
        public List<ModuleDTO> DeleteModule(int id) {

            // usunięcie z grupy dzieci (modułów) usuwanego modułu
            edumodule mod = _moduleRepository.Get(id);
            if (mod.difficulty != "easy") {

                List<edumodule> children = SelectChildren(id);
                foreach (var child in children)
                    child.parent = null;

                _moduleRepository.SaveChanges();
            }

            // usunięcie z bazy pytań przypisanych do usuwanego modułu, jesli to moduł 'easy'
            else {
                //List<test_question> questions = _questionService.SelectQuestionsForModule(id);
                List<test_question> questions = mod.test_question.ToList();
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


        // ---------------------------------------------------------------------------------------------
        public static int SortModules(edumodule a, edumodule b) {
            if (a.group_position != b.group_position)
                return a.group_position > b.group_position ? 1 : -1;
            return a.id > b.id ? 1 : -1;
        }


        // PRIVATE
        // =============================================================================================
        private List<ModuleDTO> FillMetaModule(ModuleDTO[] moduleGroup, edumodule newModule) {

            // sortowanie otrzymanych modułów w kolejności id
            List<ModuleDTO> moduleList = new List<ModuleDTO>(moduleGroup);
            moduleList.Sort((a, b) => (a.id > b.id ? 1 : -1));


            // przygotowanie modułu do wypełnienia treścią dzieci
            List<edumodule> children;
            bool newOne = false;

            if (newModule == null) {
                newOne = true;
                newModule = new edumodule();
                children = new List<edumodule>();
            }
            else
                children = newModule.edumodule1.ToList();


            // połączenie treści i przykładów dzieci w pojedyncze stringi
            edumodule child;
            string content = "", example = "", childContent = "", childExample = "";
            int nContents = 0, nExamples = 0;

            for (var i = 0; i < moduleList.Count; i++) {
                child = _moduleRepository.Get(moduleList[i].id);

                childContent = child.content;
                if (childContent != "") {
                    content += ChildSeparator(child, i, nContents, false) + childContent;
                    nContents++;
                }

                childExample = child.example;
                if (childExample != "") {
                    example += ChildSeparator(child, i, nExamples, true) + childExample;
                    nExamples++;
                }

                if (newOne)
                    children.Add(child);
            }

            // zapisanie nowego lub odświeżenie nadrzędnego modułu w bazie danych
            newModule.content = content;
            newModule.example = example;

            if (newOne) {
                newModule.difficulty = moduleGroup[0].difficulty == "easy" ? "medium" : "hard";
                newModule.title = "<podaj tytuł>";
                newModule.group_position = 2000000000;
                _moduleRepository.Add(newModule);

                // zmiana parentId wszystkich modułów podrzędnych na id nowo utworzonego modułu
                foreach (var childReady in children)
                    childReady.parent = newModule.id;
            }

            _moduleRepository.SaveChanges();


            if (newOne) {
                // odświeżenie sekwencji modułów
                CreateModuleSequence();

                // wysłanie do frontu nowo utworzonego modułu
                return GetSimpleModules();
            }
            else
                return null;
        }


        // ---------------------------------------------------------------------------------------------
        private string ChildSeparator(edumodule module, int index, int nthElem, bool code) {

            string separator;

            // module 'medium' is being created
            if (module.difficulty == "easy") {

                if (code) {
                    separator = "//" + (index + 1).ToString() + ") ";
                    for (var i = separator.Length; i < 56; i++)
                        separator += '-';
                }
                else {
                    separator = "________________________________________________________\n";
                    separator += (index + 1).ToString() + ")";
                }
                if (nthElem > 0)
                    separator = "\n\n\n" + separator;
            }

            // module 'hard' is being created
            else {
                string comment = code ? "// " : "";

                separator = comment + module.title.ToUpper() + "\n";
                separator += comment + "=====================================================";

                if (nthElem > 0)
                    separator = "\n\n\n\n\n" + separator;
            }

            return separator + "\n";
        }


        // ---------------------------------------------------------------------------------------------
        private int SortModules(ModuleDTO a, ModuleDTO b) {
            if (a.group_position != b.group_position)
                return a.group_position > b.group_position ? 1 : -1;
            return a.id > b.id ? 1 : -1;
        }


        // ---------------------------------------------------------------------------------------------
        private List<TestCodeDTO> CodeDtosForModule(edumodule module) {
            return TestCodeMapper.GetCodeListDTO(CodesForModule(module));
        }


        // ---------------------------------------------------------------------------------------------
        /* Pobiera z bazy wszystkie zadania z kodu  dla danego modułu. 
         * Jeżeli to nie jest moduł 'easy' - pobiera w tym celu wszystkie zadania
         * swoich dzieci (rekurencyjnie). 
         */
        private List<test_code> CodesForModule(edumodule module) {

            List<test_code> codes;

            // pytania dla modułu 'easy'
            if (module.difficulty == "easy")
                codes = module.test_code.ToList();

            // pytania dla modułów 'medium' i 'hard' - rekurencyjnie
            else {
                codes = new List<test_code>();
                var children = SelectChildren(module.id);
                children.ForEach(child => {
                    codes.AddRange(CodesForModule(child));
                });
            }

            return codes;
        }


        // ---------------------------------------------------------------------------------------------
        private List<TestQuestionDTO> QuestionDtosForModule(edumodule module) {
            return TestQuestionMapper.GetQuestionListDTO(QuestionsForModule(module));
        }


        // ---------------------------------------------------------------------------------------------
        /* Pobiera z bazy wszystkie pytaniadania dla danego modułu. 
         * Jeżeli to nie jest moduł 'easy' - pobiera w tym celu wszystkie pytania
         * swoich dzieci (rekurencyjnie). 
         */
        private List<test_question> QuestionsForModule(edumodule module) {

            List<test_question> questions;

            // pytania dla modułu 'easy'
            if (module.difficulty == "easy")
                //questions = _questionService.SelectQuestionsForModule(module.id).ToList();
                questions = module.test_question.ToList();

            // pytania dla modułów 'medium' i 'hard' - rekurencyjnie
            else {
                questions = new List<test_question>();
                var children = SelectChildren(module.id);
                children.ForEach(child => {
                    questions.AddRange(QuestionsForModule(child));
                });
            }

            return questions;
        }


        // ---------------------------------------------------------------------------------------------
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

                children = modules.Where(child => child.parent == mod.id).ToList();
                if (children.Count() > 0)
                    CreateModuleTree(children, ref modules, ref sortedModules);
            }
        }
    }
}
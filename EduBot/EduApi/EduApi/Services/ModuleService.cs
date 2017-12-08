using EduApi.DAL.Interfaces;
using EduApi.Dto;
using EduApi.Dto.Mappers;
using EduApi.DTO;
using EduApi.Repositories.Interfaces;
using EduApi.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace EduApi.Services {

    // =================================================================================================
    public class ModuleService : IModuleService {

        private readonly IModuleRepository _moduleRepository;
        private readonly ITestQuestionService _questionService;


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public ModuleService(IModuleRepository moduleRepository, ITestQuestionService questionService) {
            _moduleRepository = moduleRepository;
            _questionService = questionService;
        }
        #endregion


        // PUBLIC
        // =============================================================================================
        public ModuleDTO NextModule(string sessionId) {

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

            return null;
        }


        // ---------------------------------------------------------------------------------------------
        public List<ModuleDTO> GetSimpleModules() {

            List<ModuleDTO> sortedModules = new List<ModuleDTO>();
            List<ModuleDTO> orphans = new List<ModuleDTO>();

            List<ModuleDTO> modules, hardModules, mediumModules, easyModules;
            List<ModuleDTO> mediumChildren, easyChildren;


            // pobranie danych z bazy
            modules = _moduleRepository.All().GetSimpleDTOList();
            hardModules = modules.Where(m => m.difficulty == "hard").ToList();
            mediumModules = modules.Where(m => m.difficulty == "medium").ToList();
            easyModules = modules.Where(m => m.difficulty == "easy").ToList();


            // ustawienie wszystkich modułów w hierarchiczne drzewo
            hardModules.Sort((a, b) => SortListView(a, b));
            hardModules.ForEach(hardMod => {

                sortedModules.Add(hardMod);

                mediumChildren = mediumModules.Where(medMod => medMod.group_id == hardMod.id).ToList();
                mediumChildren.Sort((a, b) => SortListView(a, b));
                mediumChildren.ForEach(medMod => {

                    sortedModules.Add(medMod);

                    easyChildren = easyModules.Where(easyMod => easyMod.group_id == medMod.id).ToList();
                    easyChildren.Sort((a, b) => SortListView(a, b));
                    easyChildren.ForEach(easyMod => {

                        sortedModules.Add(easyMod);
                        orphans.Add(easyMod);
                    });
                });
            });

            // dodanie modułów 'easy' nie przypisanych do żadnego nadrzędnego
            sortedModules.AddRange(orphans);

            return sortedModules;
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO GetModule(int id) {

            edumodule module = _moduleRepository.Get(id);
            ModuleDTO moduleDTO = ModuleMappper.GetDTO(module);

            IEnumerable<test_question> questions = _questionService.SelectQuestionsForModule(id);
            moduleDTO.test_question = TestQuestionMapper.GetListDTO(questions);

            return moduleDTO;
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO UpsertModule(ModuleDTO moduleReceived) {

            var id = moduleReceived.id;
            edumodule module;

            // zapisanie nowego modułu lub zmian istniejącego
            if (id == 0) {
                module = new edumodule();
                ModuleMappper.CopyValues(moduleReceived, module);
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


            return ModuleMappper.GetDTO(module);
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
            // TODO - zmienić w bazie i EF group_id z short na int
            edumodule childModule;
            foreach (var child in moduleGroup) {
                childModule = _moduleRepository.Get(child.id);
                childModule.group_id = (short)newModule.id;
                _moduleRepository.SaveChanges();
            }

            // wysłanie do frontu nowo utworzonego modułu
            return ModuleMappper.GetDTO(newModule);
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

            // usunięcie z bazy pytań przypisanych do usuwanego modułu
            List<test_question> questions = _questionService.SelectQuestionsForModule(id);
            foreach (var child in questions)
                _questionService.DeleteQuestion(child.id);


            // usunięcie modułu
            _moduleRepository.Delete(id);

            return GetSimpleModules();
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO NextModule(int userId) {
            return null;
        }


        // PRIVATE
        // =============================================================================================
        private int SortListView(ModuleDTO a, ModuleDTO b) {
            return a.group_position > b.group_position ? 1 : -1;
        }
    }
}
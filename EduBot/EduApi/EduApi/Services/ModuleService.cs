using EduApi.DAL.Interfaces;
using EduApi.Dto.Mappers;
using EduApi.DTO;
using EduApi.Services.Interfaces;
using System.Collections.Generic;

namespace EduApi.Services {

    public class ModuleService : IModuleService {

        private readonly IModuleRepository _moduleRepository;

        #region Constructor
        public ModuleService(IModuleRepository moduleRepository) {
            _moduleRepository = moduleRepository;
        }
        #endregion


        // ---------------------------------------------------------------------------------------------
        public List<ModuleDTO> GetSimpleModules() {
            List<ModuleDTO> modules = _moduleRepository.All().GetSimpleDTOList();
            modules.Sort((a, b) => (a.id > b.id ? 1 : -1));
            return modules;
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO GetModule(int id) {
            edumodule module = _moduleRepository.Get(id);
            return ModuleMappper.GetDTO(module);
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO UpsertModule(ModuleDTO moduleReceived) {

            var id = moduleReceived.id;
            edumodule module;

            if (id == 0) {
                module = new edumodule();
                _moduleRepository.Add(module);
            }
            else
                module = _moduleRepository.Get(id);

            _moduleRepository.SetNewValues(moduleReceived, module);

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
            string testTask = "";

            ModuleDTO moduleDTO;
            for (var i = 0; i < moduleList.Count; i++) {
                moduleDTO = moduleList[i];
                content += "\n\n" + moduleDTO.content;
                example += "\n\n" + moduleDTO.example;
                if (moduleDTO.test_type == "code") testTask += "\n\n" + moduleDTO.test_task;
            }
            newModule.content = content.Substring(2);
            newModule.example = example.Substring(2);
            newModule.test_task = testTask == "" ? "" : testTask.Substring(2);

            newModule.difficulty = moduleGroup[0].difficulty == "easy" ? "medium" : "hard";
            newModule.title = "<podaj tytuł>";


            // zapisanie nowego nadrzędnego modułu w bazie danych
            _moduleRepository.Add(newModule);

            // zmiana id_grupy wszystkich modułów podrzędnych na id nowo utworzonego modułu
            // TODO - zmienić w bazie i EF id_group z short na int
            edumodule childModule;
            foreach (var child in moduleGroup) {
                childModule = _moduleRepository.Get(child.id);
                childModule.id_group = (short)newModule.id;
                _moduleRepository.SaveChanges();
            }

            // wysłanie do frontu nowo utworzonego modułu
            return ModuleMappper.GetDTO(newModule);
        }


        // ---------------------------------------------------------------------------------------------
        public List<ModuleDTO> DeleteModule(int id) {

            // usunięcie dzieci usuwanego modułu z grupy
            edumodule mod = _moduleRepository.Get(id);
            if (mod.difficulty != "easy") {

                List<edumodule> children = _moduleRepository.SelectChildren(id);
                foreach (var child in children)
                    child.id_group = null;

                _moduleRepository.SaveChanges();
            }


            // usunięcie modułu
            _moduleRepository.Delete(id);

            return GetSimpleModules();
        }
    }
}
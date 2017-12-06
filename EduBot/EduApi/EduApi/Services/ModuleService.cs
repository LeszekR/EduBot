﻿using EduApi.DAL.Interfaces;
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


        // CONSTRUCTOR
        // =============================================================================================
        #region Constructor
        public ModuleService(IModuleRepository moduleRepository) {
            _moduleRepository = moduleRepository;
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

        public List<ModuleDTO> GetSimpleModules() {
            List<ModuleDTO> modules = _moduleRepository.All().GetSimpleDTOList();
            List<ModuleDTO> hardModules = modules.Where(m => m.Difficulty == "hard").ToList();
            List<ModuleDTO> mediumModules = modules.Where(m => m.Difficulty == "medium").ToList();
            List<ModuleDTO> sortedModules = modules.Where(m => m.Difficulty == "easy").ToList();

            mediumModules.ForEach( mm =>
            {
                int idx = sortedModules.FindIndex(em => em.Id_group == mm.Id);
                if(idx >= 0)
                    sortedModules.Insert(idx, mm);
                else sortedModules.Add(mm);
            });

            hardModules.ForEach(hm => {
                var idx = sortedModules.FindIndex(em => em.Id_group == hm.Id);
                if (idx >= 0)
                    sortedModules.Insert(idx, hm);
                else sortedModules.Add(hm);
            });

            return sortedModules;
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO GetModule(int id) {
            edumodule module = _moduleRepository.Get(id);
            return ModuleMappper.GetDTO(module);
        }


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO UpsertModule(ModuleDTO moduleReceived) {

            var id = moduleReceived.Id;
            edumodule module;

            if (id == 0) {
                module = new edumodule();
                try
                {
                    _moduleRepository.Add(module);
                }
                catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
                {
                    Exception raise = dbEx;
                    foreach (var validationErrors in dbEx.EntityValidationErrors)
                    {
                        foreach (var validationError in validationErrors.ValidationErrors)
                        {
                            string message = string.Format("{0}:{1}",
                                validationErrors.Entry.Entity.ToString(),
                                validationError.ErrorMessage);
                            // raise a new exception nesting
                            // the current instance as InnerException
                            raise = new InvalidOperationException(message, raise);
                        }
                    }
                    throw raise;
                }
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
            moduleList.Sort((a, b) => (a.Id > b.Id ? 1 : -1));


            // połączenie treści, przykładów i - jeżeli jest - testów z kodu modułów podrzędnych
            edumodule newModule = new edumodule();
            string content = "";
            string example = "";

            ModuleDTO moduleDTO;
            for (var i = 0; i < moduleList.Count; i++) {
                moduleDTO = moduleList[i];
                content += "\n\n" + moduleDTO.Content;
                example += "\n\n" + moduleDTO.Example;
            }
            newModule.content = content.Substring(2);
            newModule.example = example.Substring(2);

            newModule.difficulty = moduleGroup[0].Difficulty == "easy" ? "medium" : "hard";
            newModule.title = "<podaj tytuł>";


            // zapisanie nowego nadrzędnego modułu w bazie danych
            _moduleRepository.Add(newModule);

            // zmiana id_grupy wszystkich modułów podrzędnych na id nowo utworzonego modułu
            // TODO - zmienić w bazie i EF id_group z short na int
            edumodule childModule;
            foreach (var child in moduleGroup) {
                childModule = _moduleRepository.Get(child.Id);
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


        // ---------------------------------------------------------------------------------------------
        public ModuleDTO NextModule(int userId) {
            return null;
        }
    }
}
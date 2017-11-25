﻿using EduApi.DTO;
using System.Web.Http;
using System.Linq;
using EduApi.DAL;
using System.Web.Http.Cors;
using System.Collections.Generic;
using EduApi.Dto.Mappers;

namespace EduApi.Controllers {


    // -------------------------------------------------------------------------------------------------
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "GET,POST", SupportsCredentials = true)]
    public class ModuleController : ApiController {


        //// ---------------------------------------------------------------------------------------------
        //public IHttpActionResult GetLastIdx() {
        //    int? index = 0;

        //    using (edumaticEntities db = new edumaticEntities()) {
        //        index = db.edumodule.Max(module => (int?)module.id) ?? 0;
        //    }
        //    return Ok(index);
        //}


        // ---------------------------------------------------------------------------------------------
        public IHttpActionResult GetSimpleModules() {

            //IQueryable<edumodule> modules;
            List<ModuleDTO> modules;

            using (edumaticEntities db = new edumaticEntities()) {
                //modules = db.edumodule.Select(ed => ModuleMappper.GetSimpleDTO(ed)).ToList();
                modules = (from ed in db.edumodule select ed).GetSimpleDTOList();
            }
            return Ok(modules);
            //return Ok("próba");
        }


        // ---------------------------------------------------------------------------------------------
        public IHttpActionResult GetModule(int id) {

            edumodule module;

            using (edumaticEntities db = new edumaticEntities()) {
                module = (
                    from ed in db.edumodule
                    where ed.id == id
                    select ed)
                    .FirstOrDefault();
            }
            return Ok(ModuleMappper.GetDTO(module));
        }


        // ---------------------------------------------------------------------------------------------
        [HttpPost]
        public IHttpActionResult UpsertModule(ModuleDTO moduleReceived) {

            var id = moduleReceived.id;
            edumodule module;

            using (edumaticEntities db = new edumaticEntities()) {

                if (id == 0) {
                    module = new edumodule();
                    db.edumodule.Add(module);
                }
                else
                    module = db.edumodule.Where(edd => edd.id == id).First();

                db.Entry(module).CurrentValues.SetValues(moduleReceived);
                db.SaveChanges();
            }

            return Ok(ModuleMappper.GetDTO(module));
        }


        // ---------------------------------------------------------------------------------------------
        [HttpPost]
        public IHttpActionResult NewMetaModule(ModuleDTO[] moduleGroup) {

            edumodule module = new edumodule();
            string content = "";
            string example = "";
            string testTask = "";


            // połączenie treści, przykładów i - jeżeli jest - testów z kodu modułów podrzędnych
            foreach (var mod in moduleGroup) {
                content += "\n\n" + mod.content;
                example += "\n\n" + mod.example;
                if (mod.test_type == "code")
                    testTask += "\n\n" + mod.test_task;
            }
            module.content = content.Substring(2);
            module.example = example.Substring(2);
            module.test_task = testTask == "" ? "" : testTask.Substring(2);

            module.difficulty = moduleGroup[0].difficulty == "easy" ? "medium" : "hard";
            module.title = "<podaj tytuł>";


            // zapisanie nowego nadrzędnego modułu w bazie danych
            using (edumaticEntities db = new edumaticEntities()) {
                db.edumodule.Add(module);
                db.SaveChanges();

                // zapisanie id_grupy wszystkich modułów podrzędnych jako id nowo utworzonego modułu
                // TODO - zmienić w bazie i EF id_group z short na int
                foreach (var mod in moduleGroup) {
                    db.edumodule.Where(m => m.id == mod.id).First().id_group = (short)module.id;
                    db.SaveChanges();
                }
            }


            // wysłanie do frontu nowo utworzonego modułu
            return Ok(ModuleMappper.GetDTO(module));
        }
    }
}
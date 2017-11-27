using EduApi.DTO;
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


        // ---------------------------------------------------------------------------------------------
        public IHttpActionResult GetSimpleModules() {

            //IQueryable<edumodule> modules;
            List<ModuleDTO> modules;

            using (edumaticEntities db = new edumaticEntities()) {
                modules = (from ed in db.edumodule select ed).GetSimpleDTOList();
            }
            modules.Sort((a, b) => (a.id > b.id ? 1 : -1));
            return Ok(modules);
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
            using (edumaticEntities db = new edumaticEntities()) {
                db.edumodule.Add(newModule);
                db.SaveChanges();

                // zapisanie id_grupy wszystkich modułów podrzędnych jako id nowo utworzonego modułu
                // TODO - zmienić w bazie i EF id_group z short na int
                foreach (var mod in moduleGroup) {
                    db.edumodule.Where(m => m.id == mod.id).First().id_group = (short)newModule.id;
                    db.SaveChanges();
                }
            }

            // wysłanie do frontu nowo utworzonego modułu
            return Ok(ModuleMappper.GetDTO(newModule));
        }
    }
}
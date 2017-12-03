using EduApi.DTO;
using System.Collections.Generic;
using System.Linq;

namespace EduApi.Dto.Mappers {


    // =================================================================================================
    public static class ModuleMappper {


        // PUBLIC
        // =============================================================================================
        public static void CopyModule(ModuleDTO source, edumodule target) {
            target.content = source.content;
            target.difficulty = source.difficulty;
            target.example = source.example;
            target.id = source.id;
            target.id_group = source.id_group;
            target.test_answer = source.test_answer;
            target.test_task = source.test_task;
            target.test_type = source.test_type;
            target.title = source.title;
        }


        // ---------------------------------------------------------------------------------------------
        public static ModuleDTO GetSimpleDTO(edumodule entity) {
            return new ModuleDTO {
                id = entity.id,
                id_group = entity.id_group,
                title = entity.title
            };
        }


        // ---------------------------------------------------------------------------------------------
        public static List<ModuleDTO> GetSimpleDTOList(this IEnumerable<edumodule> modules) {
            return modules.Select(module => GetSimpleDTO(module)).ToList();
        }


        // ---------------------------------------------------------------------------------------------
        public static ModuleDTO GetDTO(edumodule entity) {
            return new ModuleDTO {
                id = entity.id,
                id_group = entity.id_group,
                title = entity.title,
                difficulty = entity.difficulty,
                content = entity.content,
                example = entity.example,
                test_type = entity.test_type,
                test_task = entity.test_task,
                test_answer = entity.test_answer
            };
        }
    }
}
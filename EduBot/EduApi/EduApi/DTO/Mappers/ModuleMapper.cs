using EduApi.DTO;
using System.Collections.Generic;
using System.Linq;

namespace EduApi.Dto.Mappers {


    // =================================================================================================
    public static class ModuleMapper {


        // PUBLIC
        // =============================================================================================
        public static ModuleResultDTO GetModuleResultDTO (edumodule module, bool codes, bool questions) {
            return new ModuleResultDTO() {
                id = module.id,
                group_position = module.group_position,
                title = module.title,
                solvedCodes = codes,
                solvedQuestions = questions
            };
        }

        // ---------------------------------------------------------------------------------------------
        public static ModuleDTO GetSimpleDTO(edumodule entity) {
            return new ModuleDTO {
                id = entity.id,
                parent = entity.parent,
                group_position = entity.group_position,
                title = entity.title,
                difficulty = entity.difficulty
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
                parent = entity.parent,
                group_position = entity.group_position,
                title = entity.title,
                difficulty = entity.difficulty,
                content = entity.content,
                example = entity.example
            };
        }

        // ---------------------------------------------------------------------------------------------
        public static void CopyValues(ModuleDTO source, edumodule target) {
            target.id = source.id;
            target.parent = source.parent;
            target.group_position = source.group_position;
            target.title = source.title;
            target.difficulty = source.difficulty;
            target.content = source.content;
            target.example = source.example;
        }
    }
}
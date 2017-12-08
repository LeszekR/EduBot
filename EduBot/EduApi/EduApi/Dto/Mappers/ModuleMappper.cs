using EduApi.DTO;
using System.Collections.Generic;
using System.Linq;

namespace EduApi.Dto.Mappers {


    // =================================================================================================
    public static class ModuleMappper {


        // PUBLIC
        // =============================================================================================
        public static ModuleDTO GetSimpleDTO(edumodule entity) {
            return new ModuleDTO {
                id = entity.id,
                group_id = entity.group_id,
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
                group_id = entity.group_id,
                group_position = entity.group_position,
                title = entity.title,
                difficulty = entity.difficulty,
                content = entity.content,
                example = entity.example,
                test_question = entity.test_question.Cast<TestQuestionDTO>().ToList(),
                test_code = entity.test_question.Cast<TestCodeDTO>().ToList()
            };
        }
    }
}
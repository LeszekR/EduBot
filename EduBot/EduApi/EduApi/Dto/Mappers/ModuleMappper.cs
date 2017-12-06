using EduApi.DTO;
using System.Collections.Generic;
using System.Linq;

namespace EduApi.Dto.Mappers {

    public static class ModuleMappper {

        public static ModuleDTO GetSimpleDTO(edumodule entity) {
            return new ModuleDTO {
                Id = entity.id,
                Group_id = entity.group_id,
                Title = entity.title,
                Difficulty = entity.difficulty
            };
        }

        public static List<ModuleDTO> GetSimpleDTOList(this IEnumerable<edumodule> modules) {
            return modules.Select(module => GetSimpleDTO(module)).ToList();
        }

        public static ModuleDTO GetDTO(edumodule entity) {
            return new ModuleDTO {
                Id = entity.id,
                Group_id = entity.group_id,
                Title = entity.title,
                Difficulty = entity.difficulty,
                Content = entity.content,
                Example = entity.example
            };
        }

    }
}
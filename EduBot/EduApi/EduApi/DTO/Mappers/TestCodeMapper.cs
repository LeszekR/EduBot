using System.Collections.Generic;
using System.Linq;

namespace EduApi.Dto.Mappers {

    // =================================================================================================
    public static class TestCodeMapper {


        // PUBLIC
        // =============================================================================================
        public static TestCodeDTO GetDTO(test_code entity) {
            return new TestCodeDTO {
                id = entity.id,
                module_id = entity.module_id,
                position = entity.position,
                task_answer = entity.task_answer
            };
        }

        // ---------------------------------------------------------------------------------------------
        public static List<TestCodeDTO> GetCodeListDTO(this IEnumerable<test_code> questions) {
            return questions.Select(q => GetDTO(q)).ToList();
        }

        // ---------------------------------------------------------------------------------------------
        public static void CopyValues(TestCodeDTO source, test_code target) {
            target.id = source.id;
            target.module_id = source.module_id;
            target.position = source.position;
            target.task_answer = source.task_answer;
        }
    }
}
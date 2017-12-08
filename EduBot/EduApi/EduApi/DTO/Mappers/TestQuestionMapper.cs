using System.Collections.Generic;
using System.Linq;

namespace EduApi.Dto.Mappers {

    // =================================================================================================
    public static class TestQuestionMapper {


        // PUBLIC
        // =============================================================================================
        public static TestQuestionDTO GetDTO(test_question entity) {
            return new TestQuestionDTO {
                id = entity.id,
                module_id = entity.module_id,
                position = entity.position,
                question_answer = entity.question_answer
            };
        }

        // ---------------------------------------------------------------------------------------------
        public static List<TestQuestionDTO> GetListDTO(this IEnumerable<test_question> questions) {
            return questions.Select(q => GetDTO(q)).ToList();
        }
    }
}
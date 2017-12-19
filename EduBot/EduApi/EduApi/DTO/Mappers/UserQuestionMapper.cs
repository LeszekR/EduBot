//using System.Collections.Generic;
//using System.Linq;

//namespace EduApi.Dto.Mappers {

//    // =================================================================================================
//    public static class UserQuestionMapper {


//        // PUBLIC
//        // =============================================================================================
//        public static UserQuestionDTO GetDTO(user_question entity) {
//            return new UserQuestionDTO {
//                question_id = entity.question_id,
//                user_id = entity.user_id,
//                result = entity.result
//            };
//        }

//        //// ---------------------------------------------------------------------------------------------
//        //public static List<TestQuestionDTO> GetListDTO(this IEnumerable<test_question> questions) {
//        //    return questions.Select(q => GetDTO(q)).ToList();
//        //}

//        //// ---------------------------------------------------------------------------------------------
//        //public static void CopyValues(TestQuestionDTO source, test_question target) {
//        //    target.id = source.id;
//        //    target.module_id = source.module_id;
//        //    target.position = source.position;
//        //    target.question_answer = source.question_answer;
//        //}
//    }
//}
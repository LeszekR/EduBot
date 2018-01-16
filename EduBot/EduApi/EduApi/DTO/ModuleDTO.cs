using EduApi.Dto;
using System.Collections.Generic;

namespace EduApi.DTO {

    public class ModuleDTO {

        public int id { get; set; }
        public int? parent { get; set; }
        public int group_position { get; set; }
        public string difficulty { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public string example { get; set; }
        public List<TestQuestionDTO> test_questions_DTO { get; set; }
        public List<TestCodeDTO> test_codes_DTO { get; set; }

        public bool solvedQuestions { get; set; }
        public bool solvedCodes { get; set; }
    }
}
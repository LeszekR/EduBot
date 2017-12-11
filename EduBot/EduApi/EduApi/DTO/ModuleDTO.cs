using EduApi.Dto;
using System.Collections.Generic;

namespace EduApi.DTO {

    public class ModuleDTO {

        public int id { get; set; }
        public int? group_id { get; set; }
        public int group_position { get; set; }
        public string difficulty { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public string example { get; set; }
        public List<TestQuestionDTO> test_question { get; set; }
        public List<TestCodeDTO> test_code { get; set; }

        public List<int> remove_question { get; set; }
        public List<int> remove_code { get; set; }
    }
}
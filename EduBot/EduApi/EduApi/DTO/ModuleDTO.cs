using EduApi.Dto;
using System;
using System.Collections.Generic;

namespace EduApi.DTO {

    public class ModuleDTO {

        public int Id { get; set; }
        public short? Group_id { get; set; }
        public int Group_position { get; set; }
        public string Difficulty { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Example { get; set; }
        public List<TestQuestionDTO> Test_question { get; set; }
        public List<TestCodeDTO> Test_code { get; set; }
    }
}
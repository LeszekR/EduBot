using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EduApi.Dto {

    public class TestQuestionDTO {
        public int id { get; set; }
        public int position { get; set; }
        public int module_id { get; set; }
        public string question_answer { get; set; }
    }
}
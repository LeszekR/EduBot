using System;

namespace EduApi.DTO {
    public class ModuleDTO {
        public int id { get; set; }
        public Nullable<short> id_group { get; set; }
        public string difficulty { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public string example { get; set; }
        public string test_type { get; set; }
        public string test_task { get; set; }
        public string test_answer { get; set; }
    }
}
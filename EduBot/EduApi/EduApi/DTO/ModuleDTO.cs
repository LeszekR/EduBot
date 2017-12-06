using System;

namespace EduApi.DTO {

    public class ModuleDTO {
        public int Id { get; set; }
        public short? Group_id { get; set; }
        public int Group_position { get; set; }
        public string Difficulty { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Example { get; set; }
    }
}
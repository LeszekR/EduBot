namespace EduApi.Dto {

    public class TestCodeDTO {

        public int id { get; set; }
        public int position { get; set; }
        public int module_id { get; set; }
        public string task_answer { get; set; }
        public string last_answer { get; set; }
        public bool last_result { get; set; }
        //public int attempts { get; set; }
    }
}
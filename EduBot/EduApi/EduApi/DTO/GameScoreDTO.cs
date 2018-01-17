namespace EduApi.Dto {
    public class GameScoreDTO {

        public int life  { get; set; }
        public int shield  { get; set; }
        public MilitaryRank rank  { get; set; }
        public int progress  { get; set; }
        public DistractorDTO distractor { get; set; }
        //public string distractor;

        //public int progress;
        //public int correctQuestions;
        //public int correctCodes;
    }
}
using EduApi.Services;

namespace EduApi.Dto {
    public class GameScoreDTO {

        public DistractorDTO distractor { get; set; }
        public int life;
        public int progress;
        public MilitaryRank rank;
        public int shield;

        //public int progress;
        //public int correctQuestions;
        //public int correctCodes;
    }
}
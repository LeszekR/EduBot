﻿namespace EduApi.Dto {
    public class GameScoreDTO {

        public int life;
        public int rank;
        public int shield;
        public int progress;
        public DistractorDTO distractor { get; set; }

        //public int progress;
        //public int correctQuestions;
        //public int correctCodes;
    }
}
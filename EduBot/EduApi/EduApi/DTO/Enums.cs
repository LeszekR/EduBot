﻿namespace EduApi.Dto {

    public enum EmoState { UNDEFINED, BORED, FRUSTRATED, OK };
    public enum ChangeDifficulty { NO_CHANGE, UP, DOWN };
    public enum DistractorType { NO_DISTRACTOR, KICK, REWARD };
    public enum CodeAttempt { ATTEMPT_1 = 1, ATTEMPT_2 = 2, INCORRECT =  0, CORRECT = 4 }
    public enum GameItem { QUESTION, CODE, LOTTERY }
    public enum Lottery { GRENADE = 1, CASINO = 2, HOSPITAL = 3, CANARIES = 4, HELMET = 5, DECOY = 6, DEATH = 7, NO_LOTTERY = 8 }
    //public enum Promotion { UP, NO_PROMOTION, DOWN }
    public enum MilitaryRank {
        Soldier,
        Corporal,
        Sergeant,
        WarrantOfficer,
        Lieutenant,
        Captain,
        Major,
        Colonel,
        General
    }
}
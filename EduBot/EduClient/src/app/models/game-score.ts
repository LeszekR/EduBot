import { MilitaryRank } from "./enums";
import { Distractor } from "./distractor";

// ==================================================================================================================
export class GameScore {
    // progress: number;
    // correctQuestions: number;
    // correctCodes: number;

    life: number;
    progress: number;
    rank: MilitaryRank;
    shield: number;
    distractor: Distractor;
}
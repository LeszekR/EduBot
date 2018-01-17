import { MilitaryRank } from "./enums";
import { Distractor } from "./distractor";

// ==================================================================================================================
export class GameScore {
    // progress: number;
    // correctQuestions: number;
    // correctCodes: number;

    life: number;
    shield: number;
    rank: MilitaryRank;
    progress: number;
    // distractor: string;
    distractor: Distractor;
}
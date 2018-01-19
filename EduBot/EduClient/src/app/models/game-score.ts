import { MilitaryRank } from "./enums";
import { Distractor } from "./distractor";

// ==================================================================================================================
export class GameScore {
    life: number;
    shield: number;
    rank: MilitaryRank;
    progress: number;
    // image: string;
    // distractor: Distractor;
}
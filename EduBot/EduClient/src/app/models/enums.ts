// ==================================================================================================================
export enum DiffLevel {
    Easy = 0,
    Medium = 1,
    Hard = 2
}

// ==================================================================================================================
export enum Role {
    admin = 1,
    teacher = 2,
    student = 3
}

// ==================================================================================================================
export enum TestResult {
    None,
    Correct,
    Incorrect
}

// ==================================================================================================================
export enum CodeAttempt {
    ATTEMPT_1 = 1,
    ATTEMPT_2 = 2,
    INCORRECT = 0,
    CORRECT = 4
}

// ==================================================================================================================
export enum MilitaryRank {
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

// ==================================================================================================================
export class CodeMode {
    static JAVASCRIPT = "javascript";
    static HTML = "html";
}

// ------------------------------------------------------------------------------------------------------------------
export class CodeModeMapper {

    public static makeMode(mode: string): CodeMode {
        switch (mode) {
            case "javascript":
                return CodeMode.JAVASCRIPT;
            case "html":
                return CodeMode.HTML;
        }
        return null;
    }
}

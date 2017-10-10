export enum AnswerType {
    TextAnswer = 1,
    NumericAnswer = 2,
    None = 3,
    Dictionary = 4,
}

export class Answer {
    id: string;
    symbol: string;
    text: string;
    answerType: AnswerType;
}
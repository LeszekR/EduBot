import { Answer } from './answer';

export enum QuestionType {
    TrueFalse = 0,
    MultiChoiceList = 1,
    ValueQuestion = 2
}

export class Question {
    id: string;
    ordinal: number;
    symbol: string;
    text: string;
    questionType: QuestionType;
    answers: Answer[];
    moduleId: string;
}
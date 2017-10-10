import { Question } from './question';

export class Module {  
    id: number;
    name: string;
    questions: Question[];
    material: string;
    examples: string;
}
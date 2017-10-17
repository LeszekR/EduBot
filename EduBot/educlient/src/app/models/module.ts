//Models
import { TestType }     from './enum-test-type';
import { DiffLevel }    from './enum-diff-level';


// ==================================================================================================================
export class Module {  
    id: number;
    id_group: number;
    difficulty: DiffLevel;
    title: string;
    content: string;
    example: string;
    testType: TestType;
    testTask: string;
    
    isNew: boolean;
}
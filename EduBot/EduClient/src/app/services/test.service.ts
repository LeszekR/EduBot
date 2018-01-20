import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//Services
import { HttpService } from './http.service';
import { TestCodeService } from './test-code.service';

// Model
import { ClosedQuestion, ClosedQuestionDTO, ClosedQuestionAnswDTO } from '../models/closed-question';
import { CodeTaskFront, CodeTaskDTO, CodeTaskAnswDTO } from '../models/code-task';

// Components
import { QuizViewComponent } from '../views/module-view/quiz-view/quiz-view.component';
import { CodeMode, CodeModeMapper, CodeAttempt, Lottery } from '../models/enums';
import { Distractor } from '../models/distractor';
import { GameScore } from '../models/game-score';
import { ContextService } from './context.service';


// ==================================================================================================================
@Injectable()
export class TestTaskService {

    private quizPath = '/api/quiz';


    // CONSTRUCTOR
    // ==============================================================================================================
    constructor(
        private http: HttpService, 
        private testCodeService: TestCodeService,
        private context: ContextService
    ) { }


    // PUBLIC
    // ==============================================================================================================
    recordLotteryResult(drawnPrize: Lottery) {
        this.http.post<GameScore>(this.quizPath + '/lottery', drawnPrize)
            .subscribe(gameScore => this.context.appComponent.showGameScore(gameScore));
    }

    // --------------------------------------------------------------------------------------------------------------
    verifyCodeTest(codeTask: CodeTaskFront): Observable<CodeAttempt> {
        let result = this.testCodeService.executeCode(codeTask);

        let codeTaskAnswDTO = new CodeTaskAnswDTO(codeTask, result);
        return this.http.post<CodeAttempt>(this.quizPath + '/verifycodetest', codeTaskAnswDTO);
    }

    // --------------------------------------------------------------------------------------------------------------
    verifyClosedTest(answers: ClosedQuestionAnswDTO[]): Observable<ClosedQuestionAnswDTO[]> {
        return this.http.post<ClosedQuestionAnswDTO[]>(
            this.quizPath + '/verifyclosedtest', answers);
    }

    // --------------------------------------------------------------------------------------------------------------
    StringifyClosedQuestions(questions: ClosedQuestion[], moduleId: number): ClosedQuestionDTO[] {

        if (questions == undefined)
            return null;
        if (questions.length == 0)
            return null;


        let questionArr: ClosedQuestionDTO[] = [];
        let qDTO: ClosedQuestionDTO;
        let q: ClosedQuestion;
        let answersStr: string;

        for (var i in questions) {

            q = questions[i];

            answersStr = "";
            for (var j in q.answers) answersStr += "*" + q.answers[j];

            qDTO = new ClosedQuestionDTO();
            qDTO.id = q.id;
            qDTO.module_id = moduleId;
            qDTO.position = +i;
            qDTO.question_answer = q.question + "^" + q.correct_idx + "^" + answersStr.substr(1);

            questionArr[questionArr.length] = qDTO;
        }

        return questionArr;
    }


    // --------------------------------------------------------------------------------------------------------------
    StringifyCodeTasks(codeTasks: CodeTaskFront[], moduleId: number): CodeTaskDTO[] {

        if (codeTasks == undefined)
            return null;
        if (codeTasks.length == 0)
            return null;


        let codeTaskDtoArr: CodeTaskDTO[] = [];
        let codeTaskDto: CodeTaskDTO;
        let codeTask: CodeTaskFront;

        for (var i in codeTasks) {

            codeTaskDto = new CodeTaskDTO();
            codeTaskDto.module_id = moduleId;

            codeTask = codeTasks[i];

            codeTaskDto.id = codeTask.id;
            codeTaskDto.position = codeTask.position;
            codeTaskDto.task_answer =
                codeTask.question
                + '^' + codeTask.surroundingCode
                + '^' + codeTask.executorCode
                + '^' + codeTask.codeMode
                + '^' + codeTask.correctResult
                + '^' + codeTask.studentCode
                // + '^' + codeTask.correctResultType
                ;

            codeTaskDtoArr[codeTaskDtoArr.length] = codeTaskDto;
        }

        return codeTaskDtoArr;
    }

    // --------------------------------------------------------------------------------------------------------------
    UnpackClosedQuestions(questions: ClosedQuestionDTO[]): ClosedQuestion[] {

        if (questions.length == 0)
            return;


        let questionsArr: ClosedQuestion[] = [];
        let q: ClosedQuestion;
        let elements: string[];

        for (var i in questions) {

            elements = questions[i].question_answer.split("^");

            q = new ClosedQuestion();
            q.id = questions[i].id;
            q.question = elements[0];
            q.correct_idx = +elements[1];
            q.answers = elements[2].split("*");

            questionsArr[questionsArr.length] = q;
        }
        return questionsArr;
    }

    // --------------------------------------------------------------------------------------------------------------
    UnpackCodeTasks(codeTaskDtos: CodeTaskDTO[]): CodeTaskFront[] {

        if (codeTaskDtos.length == 0)
            return;


        let codeTaskDTO: CodeTaskDTO;
        let codeTaskArr: CodeTaskFront[] = [];
        let codeTask: CodeTaskFront;
        let elements: string[];

        for (var i in codeTaskDtos) {

            codeTaskDTO = codeTaskDtos[i];
            codeTask = new CodeTaskFront();

            codeTask.id = codeTaskDTO.id;
            codeTask.position = codeTaskDTO.position;
            codeTask.last_result = codeTaskDTO.last_result;
            codeTask.studentCode = codeTaskDTO.last_answer;

            elements = codeTaskDTO.task_answer.split("^");
            codeTask.question = elements[0];
            codeTask.surroundingCode = elements[1];
            codeTask.executorCode = elements[2];
            codeTask.codeMode = CodeModeMapper.makeMode(elements[3]);
            codeTask.correctResult = elements[4];

            codeTaskArr[codeTaskArr.length] = codeTask;
        }

        return codeTaskArr;
    }
}
import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { DiffLevel } from '../../models/enum-diff-level';
import { Module } from '../../models/module';
import { ClosedQuestionAnswDTO } from '../../models/quiz-model/closed-question';
import { ClosedQuestion } from '../../models/quiz-model/closed-question';
import { TestResult } from '../../models/quiz-model/enum-test-result';
import { CodeTask } from '../../models/quiz-model/code-task';

//Services
import { TestTaskService } from '../../services/test.service';
import { ModuleService } from '../../services/module.service';
import { ContextService } from '../../services/context.service';
import { MessageService } from '../../shared/components/message/message.service'

//Components
import { AppComponent } from '../../app.component'

// import { MockData } from '../../mock/test-data'


// ==================================================================================================================
@Component({
  selector: 'module-view',
  templateUrl: './module-view.component.html',
  styles: ['./module-view.component.css']
})
export class ModuleViewComponent implements OnInit, OnDestroy {

  module: Module;
  viewType: string;
  appComp: AppComponent;
  sub: any;

  private readonly CONTENT_VIEW = 'content';
  private readonly QUIZ_VIEW = 'quiz';
  private readonly CODE_VIEW = 'code';


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(
    private route: ActivatedRoute,
    private moduleService: ModuleService,
    private context: ContextService,
    private testTaskService: TestTaskService,
    private messageService: MessageService) { }

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.init(data.module);
      this.viewType = this.CONTENT_VIEW;
    });

    this.sub = this.moduleService.refreshModule.subscribe( m => {
      this.init(m);
    });
  }

  ngOnDestroy(){
    if(this.sub) this.sub.unsubscribe();
  }

  init(mod :Module){
    this.module = mod;
    this.context.currentModule = mod;
    this.context.moduleViewComponent = this;
    this.module.questions = this.testTaskService.UnpackClosedQuestions(this.module.test_questions_DTO);
    this.module.codeTasks = this.testTaskService.UnpackCodeTasks(this.module.test_codes_DTO);
  }

  // PUBLIC
  // ==============================================================================================================
  save() {

    // check if every question has been assigned the correct answer
    if (!this.hasAllAnswers('edit.no-correct-answer'))
      return;

    // check if every code task has been solved
    if (!this.hasAllCodes('edit.no-code'))
      return;

    this.module.test_questions_DTO = this.testTaskService
      .StringifyClosedQuestions(this.module.questions, this.module.id);

    this.module.test_codes_DTO = this.testTaskService
      .StringifyCodeTasks(this.module.codeTasks, this.module.id);

    this.moduleService.saveModule(this.module).subscribe(res => {
      this.module = res;
      this.module.questions = this.testTaskService.UnpackClosedQuestions(this.module.test_questions_DTO);
      this.module.codeTasks = this.testTaskService.UnpackCodeTasks(this.module.test_codes_DTO);
    });
    this.moduleService.moduleAdded.emit(this.module);
  }

  // --------------------------------------------------------------------------------------------------------------
  hasAllCodes(msg: string): boolean {

    let tasks = this.module.codeTasks;
    for (var i in tasks)

      // stop if unsolved code task is fonud
      if (tasks[i].exec_output.replace(" ", '').length < 7) {
        this.messageService.info(msg, 'common.empty');
        return false;
      }
    return true;
  }

  // --------------------------------------------------------------------------------------------------------------
  hasAllAnswers(msg: string): boolean {

    for (var i in this.module.questions)

      // stop if unanswered question is fonud
      if (this.module.questions[i].correct_idx == -1) {
        this.messageService.info(msg, 'common.empty');
        return false;
      }
    return true;
  }


  // PRIVATE
  // ==============================================================================================================
  private verifyCodeTest() {

    // check if all answers have been given
    if (!this.hasAllCodes('learn.unfinished-code'))
      return;


    this.testTaskService.verifyCodeTest(this.context.currentCodeTask)
      .subscribe(codeExecResult => {

        // show the result
        // TODO - zmienić kolor zakładki na zielony | czerwony
        console.log(codeExecResult);

        // showing the updated game score
        this.context.appComponent.showGameScore();
      });
  }

  // --------------------------------------------------------------------------------------------------------------
  private verifyClosedTest() {
    this.module.questions.forEach(q => q.status = TestResult.None);

    // check if all answers have been given
    if (!this.hasAllAnswers('learn.unfinished-test'))
      return;


    // all questions have been answered
    let answers: ClosedQuestionAnswDTO[] = [];
    let q: ClosedQuestion;

    for (var i in this.module.questions) {
      q = this.module.questions[i];
      answers[answers.length] = new ClosedQuestionAnswDTO(q.id, q.correct_idx);
    }

    this.testTaskService.verifyClosedTest(answers)
      .subscribe(res => {

        // slow show of the results
        let multiplier = 1;
        res.forEach(result => {
          let question = this.module.questions.find(q => q.id == result.question_id);
          setTimeout(() => { question.status = result.answer_id == 0 ? TestResult.Incorrect : TestResult.Correct; }, 1000 * multiplier++);
        })

        // showing the updated game score
        this.context.appComponent.showGameScore();
      });
  }

  // --------------------------------------------------------------------------------------------------------------
  private explanationExists(): boolean {
    let currentModule = this.context.currentModule;
    if (currentModule == null)
      return false;
    return currentModule.difficulty != 'easy';
  }

  // --------------------------------------------------------------------------------------------------------------
  private viewChange(viewType: string) {
    this.viewType = viewType;
    if (viewType == this.CODE_VIEW)

      // TODO po wstawieniu tab-component aktualizować context.currentCodeTask na kod wyświetlany aktualnie
      if (this.module.codeTasks == undefined)
        this.context.currentCodeTask = undefined;
      else
        this.context.currentCodeTask = this.module.codeTasks[0];
  }
}

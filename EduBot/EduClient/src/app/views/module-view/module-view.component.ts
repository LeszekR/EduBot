import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { DiffLevel, CodeAttempt } from '../../models/enums';
import { Module } from '../../models/module';
import { ClosedQuestionAnswDTO } from '../../models/closed-question';
import { ClosedQuestion } from '../../models/closed-question';
import { TestResult } from '../../models/enums';

//Services
import { TestTaskService } from '../../services/test.service';
import { TestCodeService } from '../../services/test-code.service';
import { ModuleService } from '../../services/module.service';
import { ContextService } from '../../services/context.service';
import { MessageService } from '../../shared/components/message/message.service';

//Components
import { AppComponent } from '../../app.component'
import { DistractorService } from '../../services/distractor.service';
import { Images } from '../../models/distractor';
import { fadeInAnimation } from '../../shared/animation/fade-in.animation';
import { CodeTaskViewComponent } from './code-task-view/code-task-view.component';
// import { DistractorService, DistractorType } from '../../services/distractor.service';


// ==================================================================================================================
@Component({
  selector: 'module-view',
  templateUrl: './module-view.component.html',
  styleUrls: ['./module-view.component.css'],
  animations: [fadeInAnimation]
})
export class ModuleViewComponent implements OnInit, OnDestroy {

  @ViewChild(CodeTaskViewComponent)
  codeTaskView: CodeTaskViewComponent;

  module: Module;
  viewType: string;
  appComp: AppComponent;
  sub: any;

  private readonly CONTENT_VIEW = 'content';
  private readonly QUIZ_VIEW = 'quiz';
  private readonly CODE_VIEW = 'code';
  private imgSrc: string;
  private imgClass: string;


  // CONSTRUCTOR
  // ==============================================================================================================
  constructor(
    private route: ActivatedRoute,
    private moduleService: ModuleService,
    private context: ContextService,
    private distractorService: DistractorService,
    private testTaskService: TestTaskService,
    private testCodeService: TestCodeService,
    private messageService: MessageService) { }

  // --------------------------------------------------------------------------------------------------------------
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.init(data.module);
      this.viewType = this.CONTENT_VIEW;
      this.imgSrc = null;
    });

    this.sub = this.moduleService.refreshModule.subscribe(m => {
      this.init(m);
    });

  }

  // --------------------------------------------------------------------------------------------------------------
  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  // --------------------------------------------------------------------------------------------------------------
  init(mod: Module) {
    mod.questions = this.testTaskService.UnpackClosedQuestions(mod.test_questions_DTO);
    mod.codeTasks = this.testTaskService.UnpackCodeTasks(mod.test_codes_DTO);
    this.context.moduleViewComponent = this;
    this.module = mod;
    this.context.currentModule = mod;
  }



  // --------------------------------------------------------------------------------------------------------------
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
    let editMode = this.context.isEditMode;

    for (var i in tasks) {

      // stop if unsolved code task is found
      if (!editMode) {

        let studentCode = tasks[i].studentCode;
        let codeOk = studentCode != undefined;

        if (codeOk)
          if (studentCode.replace(" ", '').length < 7)
            codeOk = false;

        if (!codeOk) {
          this.messageService.info(msg, 'common.empty');
          return false;
        }
      }

      else if (tasks[i].correctResult == "") {
        this.messageService.info(msg, 'common.empty');
        return false;
      }
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

    this.testTaskService.verifyCodeTest(this.context.currentCodeTask)
      .subscribe(codeAttempt => {

        let mineImage: string;
        let mineSize: string;
        let idx = -1;
        let codeResult: boolean;

        if (codeAttempt == CodeAttempt.ATTEMPT_1) {
          mineImage = Images.list.codeFirstError;
          mineSize = 'img-pos-small';
        }
        else if (codeAttempt == CodeAttempt.ATTEMPT_2) {
          mineImage = Images.list.codeSecondError;
          mineSize = 'img-pos-mid';
        }
        else if (codeAttempt == CodeAttempt.INCORRECT) {
          mineImage = Images.list.codeThirdError;
          mineSize = 'img-pos-large';
          idx = this.module.codeTasks.findIndex(ct => ct.id == this.context.currentCodeTask.id);
          codeResult = false;
        }
        else if (codeAttempt == CodeAttempt.CORRECT) {
          mineImage = Images.list.codeSuccess;
          mineSize = 'img-pos-large';
          idx = this.module.codeTasks.findIndex(ct => ct.id == this.context.currentCodeTask.id);
          codeResult = true;
        }

        // update status of the module in moduleList
        if (idx > -1) {
          this.module.codeTasks[idx].last_result = codeResult;

          this.moduleService.updateModuleOnList.emit(this.module.id);

          // TODO - obsłużyć zmianę modułu z prawidłowo rozwiązanego na nierozwiązany
          // TODO - tak samo obsłużyć tę zmianę przy niezaliczeniu pytania quizu
          // else
          //   this.moduleService.codeTasksUnsolved.emit(this.module.id);
        }

        // 1. show the image
        // 2. on hiding the image refresh the gameScore
        this.codeTaskView.showImage(mineImage, mineSize);

        // // update the game score
        // this.context.appComponent.refreshGameScore();
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
        let multiplier = 7;
        res.forEach(result => {
          let question = this.module.questions.find(q => q.id == result.question_id);
          setTimeout(() => { question.status = result.answer_id == 0 ? TestResult.Incorrect : TestResult.Correct; }, 100 * multiplier++);
        })

        this.moduleService.updateModuleOnList.emit(this.module.id);

        // showing the updated game score
        this.context.appComponent.refreshGameScore();
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

import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Models
import { TestType } from '../../models/quiz-model/enum-test-type';
import { DiffLevel } from '../../models/enum-diff-level';
import { Module } from '../../models/module';
import { TestTaskAnswDTO } from '../../models/quiz-model/test-task-answ-DTO';

//Services
import { TestTaskService } from '../../services/test.service';
import { ModuleService } from '../../services/module.service';
import { ContextService } from '../../services/context.service';
import { MessageService } from '../../shared/components/message/message.service'

//Components
import { AppComponent } from '../../app.component'
import { ContentViewComponent } from './content-view/content-view.component';
import { ExampleViewComponent } from './example-view/example-view.component';
import { QuizViewComponent } from './quiz-view/quiz-view.component';

import { MockData } from '../../mock/test-data'
import { ClosedQuestion } from '../../models/quiz-model/closed-question';
import { TestResult } from '../../models/quiz-model/enum-test-result';
import { CodeTask } from '../../models/quiz-model/code-task';


// ==================================================================================================================
@Component({
  selector: 'module-view',
  templateUrl: './module-view.component.html',
  styles: ['./module-view.component.css']
})
export class ModuleViewComponent implements OnInit {

  @ViewChild(ContentViewComponent)
  private contentComponent: ContentViewComponent;
  @ViewChild(ExampleViewComponent)
  private exampleComponent: ExampleViewComponent;
  @ViewChild(QuizViewComponent)
  private quizComponent: QuizViewComponent;

  module: Module;
  viewType: string;
  appComp: AppComponent;

  questions: ClosedQuestion[];
  codeTasks: CodeTask[];

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
      this.module = data.module;
      this.context.currentModule = data.module;
      this.context.moduleViewComponent = this;
      this.questions = this.testTaskService.UnpackQuizTasks(this.module.test_question);
      this.viewType = this.CONTENT_VIEW;
    });
  }


  // PUBLIC
  // ==============================================================================================================
  verifyClosedTest() {
    this.questions.forEach(q => q.status = TestResult.None);

    // check if all answers have been given
    if (!this.hasAllAnswers('learn.unfinished-test'))
      return;


    // all questions have been answered
    let answers: TestTaskAnswDTO[] = [];
    let q: ClosedQuestion;

    for (var i in this.questions) {
      q = this.questions[i];
      answers[answers.length] = new TestTaskAnswDTO(q.id, q.correct_idx);
    }

    this.testTaskService.verifyClosedTest(answers)
      .subscribe(res => {

        // slow show of the results
        let multiplier = 1;
        res.forEach(result => {
          let question = this.questions.find(q => q.id == result.test_task_id);
          setTimeout(() => { question.status = result.answer_id == 0 ? TestResult.Incorrect : TestResult.Correct; }, 1000 * multiplier++);
        })

        // showing the updated game score
        this.context.appComponent.showGameScore();
      });
  }

  // --------------------------------------------------------------------------------------------------------------
  save() {

    // check if every question has been assigned the correct answer
    if (!this.hasAllAnswers('edit.no-correct-answer'))
      return;

    this.module.test_question = this.testTaskService
      .StringifyQuizTasks(this.questions, this.module.id, TestType.Choice);

      this.module.test_code = this.testTaskService
      .StringifyQuizTasks(this.questions, this.module.id, TestType.Choice);

      this.moduleService.saveModule(this.module).subscribe(res => this.module = res);
    this.moduleService.moduleAdded.emit(this.module);
  }

  // --------------------------------------------------------------------------------------------------------------
  hasAllAnswers(msg: string): boolean {

    for (var i in this.questions)

      // stop if unanswered question is foud
      if (this.questions[i].correct_idx == -1) {
        this.messageService.info(msg, 'common.empty');
        return false;
      }
    return true;
  }


  // PRIVATE
  // ==============================================================================================================
  private explanationExists(): boolean {
    let currentModule = this.context.currentModule;
    if (currentModule == null)
      return false;
    return currentModule.difficulty != 'easy';
  }
}
